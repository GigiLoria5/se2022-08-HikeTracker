'use strict';

// import packages and classes
const express = require('express');
const fs = require('fs');
const Hike = require('../models/Hike');

const { check, body, validationResult } = require('express-validator'); // validation middleware
//const { errorFormatter, isLoggedIn } = require('../utils/utils');
const hikeDao = require('../dao/HikeDAO');
const hutDao = require('../dao/HutDAO');
const userDao = require('../dao/UserDAO');
const locationDao = require('../dao/LocationDAO');
const parkingDao = require('../dao/ParkingDAO');
const referenceDao = require('../dao/ReferenceDAO');
const router = express.Router();

/////////////////////////////////////////////////////////////////////
//////                          POST                           //////
/////////////////////////////////////////////////////////////////////

const checkPoint = async (type, id) => {
    let res = null;
    switch (type) {
        case "location":
            res = await locationDao.getLocationById(id);
            break
        case "hut":
            res = await hutDao.getHutById(id);
            break
        case "parking_lot":
            res = await parkingDao.getParkingLotById(id);
            break
    }
    return res == null || res == undefined || res.length == 0;
}

router.post('/hikes', 
    body('title').isLength({min:1}),
    body('peak_altitude').isNumeric().isFloat({ min: 0.0}),
    body('ascent').isNumeric().isFloat({ min: 0}),
    body('track_length').isNumeric().isFloat({ min: 0.0}),
    body('expected_time').isNumeric().isFloat({ min: 0.0}),
    body('difficulty').isNumeric().isInt({ min: 1, max:3}),
    body('city').isLength({min:1}),
    body('province').isLength({min:1}),
    body('country').isLength({min:1}),
    body('description').isLength({min:1}),
    check('start point').custom(async(value, {req})=> {
        const start_point = await JSON.parse(req.body.start_point);
        if (isNaN(start_point.latitude) ||
            isNaN(start_point.longitude) ||
            (start_point.description.length == 0)) throw "Invalid start point"
        return true;
    }),
    check('end point').custom(async(value, {req})=> {
        const end_point = await JSON.parse(req.body.end_point);
        if (isNaN(end_point.latitude) ||
            isNaN(end_point.longitude) ||
            (end_point.description.length == 0)) throw "Invalid start point"
        return true;
    }),


    /*check('country province city').custom(async (value, {req}) => {
        const provinces = await hikeDao.getProvincesByCountry(req.body.country);
        if (!provinces.map(a=>a.province).includes(req.body.province)) throw "Invalid place";
        const cities = await hikeDao.getCitiesByProvince(req.body.province);
        if (!cities.map(a=>a.city).includes(req.body.city)) throw "Invalid place";
        return true;
    }),

    check('start point').custom(async(value, {req})=> {
        const start_point = req.body.start_point;
        const res = await (checkPoint(req.body.start_point_type, req.body.start_point_id));
        if (res) throw "Invalid start point"
        return true;
    }),

    check('end point').custom(async(value, {req})=> {
        const res = await (checkPoint(req.body.end_point_type, req.body.end_point_id));
        if (res) throw "Invalid end point"
        return true;
    }),*/

    /*check('reference points').custom(async(value, {req})=> {
        for (const refp of JSON.parse(req.body.reference_points).points){
            if (!["location", "hut", "parking_lot"].includes(refp.type)) throw "Invalid end point";
            const res = await (checkPoint(refp.type, refp.id));
            if (res) throw "Invalid end point";
        }
        return true;
    }),*/

    check('gpx file').custom(async (value, { req }) => {
        if (!req.files) throw "no file uploaded";
        const sizeKB = req.files.gpx.size/1024;
        if (sizeKB > 1024*10) throw "gpx file too large";
        if(req.files.gpx.mimetype != "application/gpx+xml"){
            const { fileTypeFromBuffer } = await import('file-type');
            const fileType = await fileTypeFromBuffer(req.files.gpx.data);
            if (fileType.mime != "application/xml") throw "invalid gpx file";
        }
        return true;
    }),


    async (req, res) => {
    
    try {
        if (!req.isAuthenticated() || req.user.role != "local_guide") {
            return res.status(401).json({ error: 'Not logged in' });
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            
        }
        if (!req.files) {
            throw "no file uploaded"
        } else {
            const gpx = req.files.gpx;
            const name = Date.now() + "_" + gpx.name.replace(/\.[^/.]+$/, "");
            const author_id = req.user && req.user.id;

            const start_point = await JSON.parse(req.body.start_point);
            const end_point = await JSON.parse(req.body.end_point);
            const start_point_id = await locationDao.addLocation(start_point);
            const end_point_id = await locationDao.addLocation(end_point);
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
                start_point.type,
                start_point_id,
                end_point.type,
                end_point_id
            )
            let hike_id;

            /* Add hike after everything is correct */
            const id = await hikeDao.addHike(hike, author_id)
            hike_id = id;

            for (const p of JSON.parse(req.body.reference_points).points) {
                const ref_point_id = await locationDao.addLocation(p);
                hikeDao.addReferencePoint(id, p.type, ref_point_id).catch(err => {
                    added = false;
                    hikeDao.deleteHike(id).then(_a => {
                        hikeDao.deleteReferencePoints(id);
                    });
                    throw "error adding reference points"
                })
            }

            //
            gpx.mv(`./gpx_files/${name}.gpx`, err => {
                if (err) {
                    hikeDao.deleteHike(hike_id).then(_a => {
                        hikeDao.deleteReferencePoints(hike_id);
                    });
                    throw "error saving gpx file";
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




/////////////////////////////////////////////////////////////////////
//////                          GET                            //////
/////////////////////////////////////////////////////////////////////

// /api/countries
// Return the countries
router.get('/countries',
    async (req, res) => {
        hikeDao.getCountries()
            .then((countries) => res.status(200).json(countries))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the countries` }));
    });

// /api/provinces/:country
// Return provinces by a country
router.get('/provinces/:country',
    check('country').exists(),

    async (req, res) => {

        hikeDao.getProvincesByCountry(req.params.country)
            .then((provinces) => res.status(200).json(provinces))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the provinces` }));
    });

// /api/cities/:province
// Return cities by a province
router.get('/cities/:province',
    check('province').exists(),

    async (req, res) => {

        hikeDao.getCitiesByProvince(req.params.province)
            .then((cities) => res.status(200).json(cities))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the cities` }));
    });

// /api/hikes/filters?city=value&province=value&country=value&difficulty=value&track_length=value&ascent=value&expected_time=value
router.get('/hikes/filters', async (req, res) => {

    const city = req.query.city;
    const province = req.query.province;
    const country = req.query.country;
    const difficulty = req.query.difficulty;
    const track_length = req.query.track_length;
    const ascent = req.query.ascent;
    const expected_time = req.query.expected_time;

    hikeDao.getAllHikes()
        .then(async (hikes) => {
            var result = hikes;
            if (city != undefined) {
                result = result.filter(h => h.city == city);
            }
            if (province != undefined) {
                result = result.filter(h => h.province == province);
            }
            if (country != undefined) {
                result = result.filter(h => h.country == country);
            }
            if (difficulty != undefined) {
                result = result.filter(h => h.difficulty == difficulty);
            }
            if (track_length != undefined) {
                if (track_length == "0-5") {
                    result = result.filter(h => h.track_length >= 0.0 && h.track_length <= 5.0);
                } else if (track_length == "5-15") {
                    result = result.filter(h => h.track_length >= 5.0 && h.track_length <= 15.0);
                } else if (track_length == "15-more") {
                    result = result.filter(h => h.track_length > 15.0);
                } else {
                    return res.status(400).json({ error: `Parameter error` });
                }
            }
            if (ascent != undefined) {
                if (ascent == "0-300") {
                    result = result.filter(h => h.ascent >= 0 && h.ascent <= 300);
                } else if (ascent == "300-600") {
                    result = result.filter(h => h.ascent >= 300 && h.ascent <= 600);
                } else if (ascent == "600-1000") {
                    result = result.filter(h => h.ascent >= 600 && h.ascent <= 1000);
                } else if (ascent == "1000-more") {
                    result = result.filter(h => h.ascent > 1000);
                } else {
                    return res.status(400).json({ error: `Parameter error` });
                }
            }
            if (expected_time != undefined) {
                if (expected_time == "0-1") {
                    result = result.filter(h => h.expected_time >= 0.0 && h.expected_time <= 1.0);
                } else if (expected_time == "1-3") {
                    result = result.filter(h => h.expected_time >= 1.0 && h.expected_time <= 3.0);
                } else if (expected_time == "3-5") {
                    result = result.filter(h => h.expected_time >= 3.0 && h.expected_time <= 5.0);
                } else if (expected_time == "5-more") {
                    result = result.filter(h => h.expected_time > 5.0);
                } else {
                    return res.status(400).json({ error: `Parameter error` });
                }
            }

            for (var hike of result) {
                if (hike.start_point_type == 'hut') {
                    const start = await hutDao.getHutById(hike.start_point_id);
                    hike.start = start;
                } else if (hike.start_point_type == 'parking_lot') {
                    const start = await parkingDao.getParkingLotById(hike.start_point_id);
                    hike.start = start;
                } else if (hike.start_point_type == 'location') {
                    const start = await locationDao.getLocationById(hike.start_point_id);
                    hike.start = start;
                }
                if (hike.end_point_type == 'hut') {
                    const end = await hutDao.getHutById(hike.end_point_id);
                    hike.end = end;
                } else if (hike.end_point_type == 'parking_lot') {
                    const end = await parkingDao.getParkingLotById(hike.end_point_id);
                    hike.end = end;
                } else if (hike.end_point_type == 'location') {
                    const end = await locationDao.getLocationById(hike.end_point_id);
                    hike.end = end;
                }
                const references = await referenceDao.getReferenceByHikeId(hike.id);
                hike.reference_points = [];
                for (const r of references) {
                    if (r.ref_point_type == 'hut') {
                        const point = await hutDao.getHutById(r.ref_point_id);
                        point[0].ref_point_type = r.ref_point_type;
                        hike.reference_points.push(point);
                    } else if (r.ref_point_type == 'parking_lot') {
                        const point = await parkingDao.getParkingLotById(r.ref_point_id);
                        point[0].ref_point_type = r.ref_point_type;
                        hike.reference_points.push(point);
                    } else if (r.ref_point_type == 'location') {
                        const point = await locationDao.getLocationById(r.ref_point_id);
                        point[0].ref_point_type = r.ref_point_type;
                        hike.reference_points.push(point);
                    }
                }
                const author = await userDao.getUserById(hike.author_id)
                hike.author = author.name + " " + author.surname;
            }

            res.status(200).json(result);
        })
        .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
});

module.exports = router;
