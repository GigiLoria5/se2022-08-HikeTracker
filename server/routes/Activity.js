'use strict';

// import packages and classes
const express = require('express');
const Activity = require('../models/Activity');
const { body, check, query, validationResult } = require('express-validator'); // validation middleware
const ActivityDAO = require('../dao/ActivityDAO');
const UserDAO = require('../dao/UserDAO');
const HikeDao = require('../dao/HikeDAO');

const router = express.Router();

/////////////////////////////////////////////////////////////////////
//////                          GET                            //////
/////////////////////////////////////////////////////////////////////

router.get('/activity/:hike_id',
    check('hike_id').exists().isInt(),

    async (req, res) => {
        try {
            // Check if params contains errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: "Fields validation failed" });
            }

            // Check if the user is authenticated
            if (req.isAuthenticated()) {

                // Checks if the user is autorized to retreieve hike activity status
                const user = await UserDAO.getUserById(req.user.id);
                if (user !== undefined && user.role === "hiker") {

                    // Checks if the specified hike_id exists 
                    const hike = await HikeDao.getHikeById(req.params.hike_id);
                    if (hike !== undefined) {

                        //Return if the user has started the hike specified by the id
                        await ActivityDAO.getActiveActivityByHikeId(req.params.hike_id, req.user.id)
                            .then(async (activity) => {
                                if(activity === false){
                                    res.status(200).json({});
                                }else{
                                    res.status(200).json(activity);
                                }
                            })
                            .catch((err) => {
                                res.status(500).json({ error: `Database error while retrieving the activity` });
                            });

                    } else {
                        return res.status(404).json({ error: "Specified hike doesn't exists!" });
                    }

                } else {
                    return res.status(401).json({ error: "Unauthorized to execute this operation!" });
                }

            } else {
                return res.status(401).json({ error: 'Not authorized' });
            }

        } catch (err) {
            return res.status(503).json({ error: err });
        }


    });

router.get('/activities/completed',

    async (req, res) => {
        try {

            // Check if the user is authenticated
            if (req.isAuthenticated()) {

                // Checks if the user is autorized to retreieve hike activity status
                const user = await UserDAO.getUserById(req.user.id);
                if (user !== undefined && user.role === "hiker") {

                    await ActivityDAO.getCompletedActivities(req.user.id)
                        .then(async (activity) => {
                            res.status(200).json(activity);
                        })
                        .catch((err) => {
                            res.status(500).json({ error: `Database error while retrieving the activity` });
                        });


                } else {
                    return res.status(401).json({ error: "Unauthorized to execute this operation!" });
                }

            } else {
                return res.status(401).json({ error: 'Not authorized' });
            }

        } catch (err) {
            return res.status(503).json({ error: err });
        }


    });

/////////////////////////////////////////////////////////////////////
//////                          POST                           //////
/////////////////////////////////////////////////////////////////////

// POST /api/activity

router.post('/activity', [
    body('hike_id').isInt(),
    body('start_time').isISO8601(),
], async (req, res) => {
    try {
        // Check if the user is authenticated
        if (req.isAuthenticated()) {

            // Check if the body contains errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: "Fields validation failed!" });
            }

            // Checks if the user is autorized to start a new hike activity
            const user = await UserDAO.getUserById(req.user.id);
            if (user !== undefined && user.role === "hiker") {

                // Checks if the specified hike_id exists 
                const hike = await HikeDao.getHikeById(req.body.hike_id);

                if (hike !== undefined) {
                    //Checks if the specified hike for the given user is already started 
                    const exist = await ActivityDAO.getActiveActivityByHikeId(req.body.hike_id, req.user.id);

                    if (exist === false) {
                        const activity = new Activity({
                            id: 0,
                            hike_id: req.body.hike_id,
                            start_time: req.body.start_time
                        });

                        await ActivityDAO.addActivity(activity, req.user.id);
                        return res.status(201).end();


                    } else {
                        return res.status(422).json({ error: "Hike activity already started!" });
                    }

                } else {
                    return res.status(404).json({ error: "Specified hike doesn't exists!" });
                }


            } else {
                return res.status(401).json({ error: "Unauthorized to execute this operation!" });
            }

        } else {
            return res.status(401).json({ error: 'Not authorized' });
        }
    } catch (err) {
        return res.status(503).json({ error: err });
    }
});

/////////////////////////////////////////////////////////////////////
//////                          PUT                            //////
/////////////////////////////////////////////////////////////////////
router.put('/activity/terminate',
    body('hike_id').isInt(),
    body('end_time').isISO8601(),

    async (req, res) => {
        try {
            // Check if the user is authenticated
            if (req.isAuthenticated()) {

                // Check if the body contains errors
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({ error: "Fields validation failed!" });
                }

                // Checks if the user is autorized to terminate an hike activity
                const user = await UserDAO.getUserById(req.user.id);
                if (user !== undefined && user.role === "hiker") {

                    // Checks if the specified hike_id exists 
                    const hike = await HikeDao.getHikeById(req.body.hike_id);

                    if (hike !== undefined) {
                        //Checks if the specified hike for the given user is started and not terminated
                        const exist = await ActivityDAO.getActiveActivityByHikeId(req.body.hike_id, req.user.id);

                        if (exist.end_time === null && exist.start_time !== null) {
                            var diff = (new Date(req.body.end_time) - new Date(exist.start_time));

                            //Check if the end time is afterwards start time 
                            if(diff>0){
                                const diff_in_secs = Math.floor((Math.abs(diff) / 1000) / 60);
                                const activity = new Activity({
                                    hike_id: req.body.hike_id,
                                    end_time: req.body.end_time,
                                    duration: diff_in_secs
                                });
    
                                await ActivityDAO.terminateActivity(activity, req.user.id);
                                return res.status(204).end();
                            }else{
                                return res.status(422).json({ error: "End time must be afterwards start time!" });
                            }
                            

                        } else {
                            return res.status(404).json({ error: "No hike activity to terminate!" });
                        }

                    } else {
                        return res.status(404).json({ error: "Specified hike doesn't exists!" });
                    }


                } else {
                    return res.status(401).json({ error: "Unauthorized to execute this operation!" });
                }

            } else {
                return res.status(401).json({ error: 'Not authorized' });
            }
        } catch (err) {
            return res.status(503).json({ error: err });
        }
    });

/////////////////////////////////////////////////////////////////////
//////                       DELETE                            //////
/////////////////////////////////////////////////////////////////////

router.delete('/activity/:hike_id',
    check('hike_id').exists().isInt(),

    async (req, res) => {
        try {
            // Check if params contains errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: "Fields validation failed" });
            }

            // Check if the user is authenticated
            if (req.isAuthenticated()) {

                // Checks if the user is autorized to delete the activity started 
                const user = await UserDAO.getUserById(req.user.id);
                if (user !== undefined && user.role === "hiker") {

                    // Checks if the specified hike_id exists 
                    const hike = await HikeDao.getHikeById(req.params.hike_id);
                    if (hike !== undefined) {

                        //Check if the activity is started but not yet terminated 
                        const exist = await ActivityDAO.getActiveActivityByHikeId(req.params.hike_id, req.user.id);
                        if (exist.end_time === null && exist.start_time !== null) {

                            await ActivityDAO.deleteActivityByHikeId(req.params.hike_id, req.user.id)
                            return res.status(200).end();

                        } else {
                            return res.status(404).json({ error: "No hike activity to delete!" });
                        }

                    } else {
                        return res.status(404).json({ error: "Specified hike doesn't exists!" });
                    }

                } else {
                    return res.status(401).json({ error: "Unauthorized to execute this operation!" });
                }

            } else {
                return res.status(401).json({ error: 'Not authorized' });
            }

        } catch (err) {
            return res.status(503).json({ error: err });
        }


    });

module.exports = router;
