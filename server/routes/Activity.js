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

router.get('/activity/running',

    async (req, res) => {
        try {

            // Check if the user is authenticated and is autorized to retreieve hike activity status
            if (req.isAuthenticated()) {

                const user = await UserDAO.getUserById(req.user.id);

                if (user !== undefined && user.role === "hiker") {

                    //Return the running activity of the user or an empty object if none is running
                    await ActivityDAO.getRunningActivity(req.user.id)
                        .then(async (activity) => {
                            if (activity === false) {
                                res.status(200).json({});
                            } else {
                                res.status(200).json(activity);
                            }
                        })
                        .catch((err) => {
                            res.status(500).json({ error: `Database error while retrieving the activity` });
                        });

                } else {
                    return res.status(401).json({ error: 'Not authorized' });
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
                const user = await UserDAO.getUserById(req.user.id);

                // Check if the user is autorized to retreieve hike activity status
                if (user !== undefined && user.role === "hiker") {

                    await ActivityDAO.getCompletedActivities(req.user.id)
                        .then(async (activity) => {
                            res.status(200).json(activity);
                        })
                        .catch((err) => {
                            res.status(500).json({ error: `Database error while retrieving the activity` });
                        });

                } else {
                    return res.status(401).json({ error: 'Not authorized' });
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
        // Check if the body contains errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(422).json({ error: "Fields validation failed!" });
        }

        if (req.isAuthenticated()) {
            // Check if the user is authenticated and is autorized to start a new hike activity
            const user = await UserDAO.getUserById(req.user.id);

            if (user !== undefined && user.role === "hiker") {

                // Checks if the specified hike_id exists 
                const hike = await HikeDao.getHikeById(req.body.hike_id);

                if (hike !== undefined) {

                    //Checks if the given user is not running any activity 
                    const exist = await ActivityDAO.getRunningActivity(req.user.id);

                    if (exist === false) {
                        const activity = new Activity({
                            id: 0,
                            hike_id: req.body.hike_id,
                            start_time: req.body.start_time
                        });

                        await ActivityDAO.addActivity(activity, req.user.id);
                        return res.status(201).end();


                    } else {
                        return res.status(422).json({ error: "An hike activity is already started!" });
                    }

                } else {
                    return res.status(404).json({ error: "Specified hike doesn't exists!" });
                }


            }
            return res.status(401).json({ error: 'Not authorized' });

        }
        return res.status(401).json({ error: 'Not authorized' });



    } catch (err) {
        return res.status(503).json({ error: err });
    }
});

/////////////////////////////////////////////////////////////////////
//////                          PUT                            //////
/////////////////////////////////////////////////////////////////////
router.put('/activity/terminate',
    body('end_time').isISO8601(),

    async (req, res) => {
        try {
            // Check if the body contains errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: "Fields validation failed!" });
            }

            if (req.isAuthenticated()) {
                // Check if the user is authenticated and the user is autorized to terminate an hike activity
                const user = await UserDAO.getUserById(req.user.id);
                if (user !== undefined && user.role === "hiker") {

                    //Checks if the user is actually running an hike 
                    const exist = await ActivityDAO.getRunningActivity(req.user.id);

                    if (exist !== false) {
                        const diff = (new Date(req.body.end_time) - new Date(exist.start_time));

                        //Check if the end time is afterwards start time 
                        if (diff > 0) {
                            const delta = Math.abs(diff) / 1000;
                            const minutes = Math.floor((Math.abs(diff) / 1000) / 60);
                            const seconds = delta % 60;

                            const activity = new Activity({
                                end_time: req.body.end_time,
                                duration: minutes + "." + seconds
                            });

                            await ActivityDAO.terminateActivity(activity, req.user.id);
                            return res.status(204).end();
                        } else {
                            return res.status(422).json({ error: "End time must be afterwards start time!" });
                        }

                    } else {
                        return res.status(404).json({ error: "No hike activity to terminate!" });
                    }

                }
                return res.status(401).json({ error: 'Not authorized' });

            }
            return res.status(401).json({ error: 'Not authorized' });


        } catch (err) {
            return res.status(503).json({ error: err });
        }
    });

/////////////////////////////////////////////////////////////////////
//////                       DELETE                            //////
/////////////////////////////////////////////////////////////////////

router.delete('/activity/running',

    async (req, res) => {
        try {

            if (req.isAuthenticated()) {
                // Check if the user is authenticated and the user is autorized to delete the activity started
                const user = await UserDAO.getUserById(req.user.id);
                if (user !== undefined && user.role === "hiker") {

                    //Check if the user has a running activity to delete
                    const exist = await ActivityDAO.getRunningActivity(req.user.id);

                    if (exist !== false) {
                        await ActivityDAO.deleteActivityByHikeId(req.user.id)
                        return res.status(200).end();

                    } else {
                        return res.status(404).json({ error: "No hike activity to delete!" });
                    }


                } else {
                    return res.status(401).json({ error: 'Not authorized' });
                }
            } else {
                return res.status(401).json({ error: 'Not authorized' });
            }


        } catch (err) {
            return res.status(503).json({ error: err });
        }


    });

module.exports = router;
