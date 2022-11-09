'use strict';

// import packages and classes
const express = require('express');


const { check, validationResult } = require('express-validator'); // validation middleware
//const { errorFormatter, isLoggedIn } = require('../utils/utils');
const hikeDao = require('../dao/HikeDAO');

const router = express.Router();

/////////////////////////////////////////////////////////////////////
//////                          POST                           //////
/////////////////////////////////////////////////////////////////////


router.post('/uploadFile', async (req, res) => {
    try {
        if(!req.files) {
            res.status(500).send({
                error: 'No file uploaded'
            });
        } else {
            let name = req.body.name;
            let gpx = req.files.gpx;
            //
            gpx.mv(`./gpx_files/${name}.gpx`, err => {
                if (err){
                    throw err;
                }
            });

            //send response
            res.status(201).send({
                message: 'File is uploaded'
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});





module.exports = router;