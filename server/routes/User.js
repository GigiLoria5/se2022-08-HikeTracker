'use strict';

// import packages and classes
const express = require('express');
const path = require('path');
const nodemailer = require('../config/nodemailer.config');
const crypto = require('crypto');
const UserDao = require('../dao/UserDAO');
const { body, validationResult } = require('express-validator'); // validation middleware

const router = express.Router();

// POST /api/users
router.post('/users', [
    body('email').isEmail(),
    body('role').isString().isIn(['hiker','hut_worker','local_guide','emergency_operator']),
    body('password').notEmpty().isString(),
    body('name').if(body('role').isIn(['hut_worker','local_guide'])).notEmpty().isString(),
    body('surname').if(body('role').isIn(['hut_worker','local_guide'])).notEmpty().isString(),
    body('name').isString(),
    body('surname').isString(),
    body('phone_number').if(body('role').isIn(['hut_worker','local_guide'])).notEmpty().isMobilePhone(),
    body('phone_number').if(body('phone_number').notEmpty()).isMobilePhone(),
] ,async (req, res) => {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: "Fields validation failed! Check phone number"  });
        }
        // Checks if the user email already exists
        const exists = await UserDao.getUserByEmail(req.body.email);
        if (exists === false) {
            const token = crypto.randomBytes(16).toString('hex'); // Generate a token for account verification
            await UserDao.addUser(req.body, token); //Create a new user in the DB having email_verified=0
            const link = 'http://localhost:3001/api/users/confirm/' + token; // This link will be sent to the user 

            nodemailer.sendConfirmationEmail(req.body.email, req.body.email, link); // Send an email to the user containg the url

            return res.status(201).end();
        } else {
            return res.status(422).json({ error: "An account with the same email already exists" });
        }

    } catch (err) {
        console.log(err);
        return res.status(503).json({ error: err });
    }
});


// GET /api/users/confirm/:token
// Verification route
router.get("/users/confirm/:token", async (req, res) => {
    try {
        const token = req.params.token; // Get token from params
        if (token !== undefined) { // Checks if the token exists

            const value = await UserDao.islegit(token); //Checks if its legit to update the status of the user associated to the given token
            if (value === true) {
                const result = await UserDao.activate(token); //Updates the user account status
                if (result === true) {
                    return res.sendFile(path.join(__dirname, '../verification_html_pages/verification.html'));
                }

            } else {
                return res.sendFile(path.join(__dirname, '../verification_html_pages/error.html'));
            }

        } else {
            return res.status(404).json({ error: "Missing token" });
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ error: err });
    }
});





module.exports = router;