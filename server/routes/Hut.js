'use strict';

// import packages and classes
const express = require('express');
const Hut = require('../models/Hut');

const { body, validationResult } = require('express-validator'); // validation middleware
const HutDAO = require('../dao/HutDAO');
const UserDAO = require('../dao/UserDAO');
const { route } = require('./User');
const router = express.Router();

/////////////////////////////////////////////////////////////////////
//////                          POST                           //////
/////////////////////////////////////////////////////////////////////

// POST /api/hut
router.post('/huts', [
    body('name').isString(),
    body('type').isString().isIn(['alpine_hut', 'fixed_bivouac', 'unmanaged_hut', 'hiking_hut', 'other']),
    body('beds_number').isNumeric().isDecimal(),
    body('country').isString(),
    body('province').isString(),
    body('city').isString(),
    body('latitude').isNumeric(),
    body('longitude').isNumeric(),
    body('altitude').isDecimal(),
    body('website').optional({ checkFalsy: true }).isURL(),
    body('email').optional({ checkFalsy: true }).isEmail(),
    body('phone_number').optional({ checkFalsy: true }).notEmpty().isMobilePhone(),
    body('description').isString(),
], async (req, res) => {

    try {
        // Check if the user is authenticated
        if (req.isAuthenticated()) {

            // Check if the body contains errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: "Fields validation failed!" });
            }

            // Checks if the user is autorized to create a new hut
            const user = await UserDAO.getUserById(req.user.id);
            if (user !== undefined && user.role === "local_guide") {

                // Create a new hut object given the fields received from the client
                const hut = new Hut(0, req.body.name, req.body.city, req.body.province, req.body.country, req.body.address, req.body.altitude, req.body.description, req.body.beds_number, "", (req.body.latitude + ", " + req.body.longitude), req.body.phone_number, req.body.email, req.body.website, req.body.type)

                // Checks if the hut coordinates and location infos alread exists
                const exists = await HutDAO.checkExisting(hut);
                if (exists === false) {
                    // Hut is created and added
                    await HutDAO.addHut(req.user.id, hut);
                    return res.status(200).end();

                } else {
                    return res.status(422).json({ error: "An hut having the same location parameters already exists" });
                }

            } else {
                if (user === undefined) {
                    return res.status(404).json({ error: "User not found" });
                }
                return res.status(401).json({ error: "Unauthorized to execute this operation!" });
            }
        }
        return res.status(401).json({ error: 'Not authorized' });



    } catch (err) {
        console.log(err);
        return res.status(503).json({ error: err });
    }
});

/////////////////////////////////////////////////////////////////////
//////                        DELETE                           //////
/////////////////////////////////////////////////////////////////////

router.delete('/huts',[body('hutId').exists().isNumeric()], async(req,res)=>{
    try{
        if(req.isAuthenticated()){

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: "Fields validation failed!" });
            }
            
            await HutDAO.deleteHut(req.body.hutId,req.user.id)
            .then(() =>  res.status(200).end())
            .catch(() => res.status(500).json({ error: `Database error` }));

            
        }else{
            return res.status(401).json({ error: 'Not authorized' });
        }
    }catch(err){
        console.log(err);
        return res.status(503).json({ error: err });
    }
});

router.delete('/huts/name',[body('hutName').exists().isString()], async(req,res)=>{
    try{
        if(req.isAuthenticated()){

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: "Fields validation failed!" });
            }
            
            await HutDAO.deleteHutByName(req.body.hutName,req.user.id)
            .then(() =>  res.status(200).end())
            .catch(() => res.status(500).json({ error: `Database error` }));

            
        }else{
            return res.status(401).json({ error: 'Not authorized' });
        }
    }catch(err){
        console.log(err);
        return res.status(503).json({ error: err });
    }
});

module.exports = router;
