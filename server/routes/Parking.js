'use strict';

// import packages and classes
const express = require('express');
const { check, body, validationResult } = require('express-validator'); // validation middleware
const ParkingDAO = require('../dao/ParkingDAO');
const UserDAO = require('../dao/UserDAO');
const { route } = require('./User');
const router = express.Router();
const Parking = require('../models/Parking');

/////////////////////////////////////////////////////////////////////
//////                          POST                           //////
/////////////////////////////////////////////////////////////////////

// Add a new parking lot
// POST /api/parking
router.post('/parking', [
    body('city').isString(),
    body('province').isString(),
    body('country').isString(),
    body('latitude').isNumeric(),
    body('longitude').isNumeric(),
    body('address').isString(),
], async (req, res) => {

    try {
        // Check if the user is authenticated
        if (req.isAuthenticated()) {

            // Check if the body contains errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: "Fields validation failed!" });
            }

            // Checks if the user is autorized to create a new parking lot
            const user = await UserDAO.getUserById(req.user.id);
            if (user !== undefined && user.role === "local_guide") {

                // Create a new parking lot object given the fields received from the client
                const parking = new Parking(0, req.body.city, req.body.province, req.body.country, (req.body.latitude + ", " + req.body.longitude), req.body.address);

                // Checks if the parking lot coordinates and location infos alread exists
                const exists = await ParkingDAO.checkExisting(parking);
                if (exists === false) {
                    // Parking lot is created and added
                    await ParkingDAO.addParking(parking, req.user.id);
                    return res.status(200).end();

                } else {
                    return res.status(422).json({ error: "A parking lot having the same location parameters already exists" });
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
        return res.status(503).json({ error: err });
    }
});

/////////////////////////////////////////////////////////////////////
//////                         DELETE                          //////
/////////////////////////////////////////////////////////////////////

// Delete a parking lot by an id
// DELETE /api/parking
router.delete('/parking/:id',[
    check('id').exists().isInt(),
], async (req, res) => {

    try{
        if(req.isAuthenticated()){

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: "Params validation failed!" });
            }

            await ParkingDAO.deleteParking(req.params.id, req.user.id)
                .then(() =>  res.status(200).end())
                .catch(() => res.status(500).json({ error: `Database error` }));

        } else{
            return res.status(401).json({ error: 'Not authorized' });
        }
    } catch(err) {
        return res.status(503).json({ error: err });
    }
});

module.exports = router;