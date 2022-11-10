'use strict';

// import packages and classes
const express = require('express');
const fs = require('fs');
const Hike = require('../models/Hike');

const { check, validationResult } = require('express-validator'); // validation middleware
//const { errorFormatter, isLoggedIn } = require('../utils/utils');
const hikeDao = require('../dao/HikeDAO');
const hutDao = require('../dao/HutDAO');
const locationDao = require('../dao/LocationDAO');
const parkingDao = require('../dao/ParkingDAO');

const router = express.Router();

/////////////////////////////////////////////////////////////////////
//////                          POST                           //////
/////////////////////////////////////////////////////////////////////


router.post('/hikes', async (req, res) => {
    try {
        if(!req.files) {
            throw "no file uploaded"
        } else {
            //let name = req.body.name;
            const gpx = req.files.gpx;
            const name = Date.now() + "_" + gpx.name.replace(/\.[^/.]+$/, "");
            
            const author_id = req.user && req.user.id;
            
            const hike = new Hike(
                req.body.title,
                req.body.peak_altitude,
                req.body.city,
                req.body.province,
                req.body.country,
                req.body.description,
                req.body.ascent,
                req.body.track_length,
                req.body.expected_time,
                req.body.difficulty, 
                name, 
                req.body.start_point_type, 
                req.body.start_point_id, 
                req.body.end_point_type, 
                req.body.end_point_id
            )
            let hike_id;
            let added = true;
            const id = await hikeDao.addHike(hike, author_id)
            
            hike_id = id;
            for (const p of JSON.parse(req.body.reference_points).points){
                let res = null;
                switch(p.type){
                    case "location":
                        res = await locationDao.getLocationById(p.id);
                        break;
                    case "hut":
                        res = await hutDao.getHutById(p.id);
                        break;
                    case "parking_lot":
                        res = await parkingDao.getParkingLotById(p.id);
                        break;
                }
                if (res == null || res == undefined || res.length == 0){
                    added = false;
                    hikeDao.deleteHike(id).then(_a => {
                        hikeDao.deleteReferencePoints(id);
                    });
                    throw "invalid reference points"
                }

                hikeDao.addReferencePoint(id, p.type, p.id).catch( err => {
                    added = false;
                    hikeDao.deleteHike(id).then(_a => {
                        hikeDao.deleteReferencePoints(id);
                    });
                    throw "invalid reference points"
                })
            }

            if(gpx.mimetype!="application/gpx+xml") {
                hikeDao.deleteHike(hike_id).then(_a => {
                    hikeDao.deleteReferencePoints(hike_id);
                });
                throw "invalid gpx file";
            }
            //
            gpx.mv(`./gpx_files/${name}.gpx`, err => {
                if (err){
                    hikeDao.deleteHike(hike_id).then(_a => {
                        hikeDao.deleteReferencePoints(hike_id);
                    });
                    res.status(500).send("invalid gpx file");
                    throw err;
                }
            });

            //send response
            res.status(201).send({
                message: 'Hike uploaded'
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});




module.exports = router;