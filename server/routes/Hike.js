'use strict';

// import packages and classes
const express = require('express');
const fs = require('fs');
const Hike = require('../models/Hike');

const { check, validationResult } = require('express-validator'); // validation middleware
//const { errorFormatter, isLoggedIn } = require('../utils/utils');
const hikeDao = require('../dao/HikeDAO');
const hutDao = require('../dao/HutDAO');
const userDao = require('../dao/UserDAO');
const locationDao = require('../dao/LocationDAO');
const parkingDao = require('../dao/ParkingDAO');
const referenceDao = require('../dao/ReferenceDAO');
const router = express.Router();

const utilsHike = require('../utils/Utils_hike');

/////////////////////////////////////////////////////////////////////
//////                          POST                           //////
/////////////////////////////////////////////////////////////////////

router.post('/hikes', async (req, res) => {
    try {
        if (!req.isAuthenticated() || req.user.role != "local_guide") {
            return res.status(401).json({ error: 'Not logged in' });
        }
        if (!req.files) {
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

            if (!hike.isValid()) {
                throw "invalid arguments"
            }
            switch (hike.start_point_type) {
                case "location":
                    {
                        const res = await locationDao.getLocationById(hike.start_point_id);
                        if (res == null || res == undefined || res.length == 0) {
                            throw "invalid start point"
                        }
                        break
                    };
                case "hut":
                    {
                        const res = await hutDao.getHutById(hike.start_point_id);
                        if (res == null || res == undefined || res.length == 0) {
                            throw "invalid start point"
                        }
                        break
                    };
                case "parking_lot":
                    {
                        const res = await parkingDao.getParkingLotById(hike.start_point_id);
                        if (res == null || res == undefined || res.length == 0) {
                            throw "invalid start point"
                        }
                        break
                    };
                default:
                    throw "invalid start point"
            }
            switch (hike.end_point_type) {
                case "location":
                    {
                        const res = await locationDao.getLocationById(hike.end_point_id);
                        if (res == null || res == undefined || res.length == 0) {
                            throw "invalid end point"
                        }
                        break
                    };
                case "hut":
                    {
                        const res = await hutDao.getHutById(hike.end_point_id);
                        if (res == null || res == undefined || res.length == 0) {
                            throw "invalid end point"
                        }
                        break
                    };
                case "parking_lot":
                    {
                        const res = await parkingDao.getParkingLotById(hike.end_point_id);
                        if (res == null || res == undefined || res.length == 0) {
                            throw "invalid end point"
                        }
                        break
                    };
                default:
                    throw "invalid end point"
            }

            /* Check types before adding hike */
            const possibleTypes = ['location', 'hut', 'parking_lot'];
            const refPointTypes = JSON.parse(req.body.reference_points).points.map((point) => point.type);
            const checkRefPointTypes = refPointTypes.every((type) => possibleTypes.includes(type));
            if (!checkRefPointTypes)
                throw "invalid reference points";

            /* Add hike after everything is correct */
            const id = await hikeDao.addHike(hike, author_id)
            hike_id = id;

            for (const p of JSON.parse(req.body.reference_points).points) {
                let res = null;
                switch (p.type) {
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
                if (res == null || res == undefined || res.length == 0) {
                    added = false;
                    hikeDao.deleteHike(id).then(_a => {
                        hikeDao.deleteReferencePoints(id);
                    });
                    throw "invalid reference points"
                }
                hikeDao.addReferencePoint(id, p.type, p.id).catch(err => {
                    added = false;
                    hikeDao.deleteHike(id).then(_a => {
                        hikeDao.deleteReferencePoints(id);
                    });
                    throw "invalid reference points"
                })
            }
            if (gpx.mimetype != "application/gpx+xml") {
                hikeDao.deleteHike(hike_id).then(_a => {
                    hikeDao.deleteReferencePoints(hike_id);
                });
                throw "invalid gpx file";
            }
            //
            gpx.mv(`./gpx_files/${name}.gpx`, err => {
                if (err) {
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

// /api/hike/:id
// Return all the information of an hikes if the user is an hiker
/*ADD isLoggedIn*/ 
router.get('/hike/:id', 
    check('id').exists().isInt(),
    
    async (req, res) => {
        if (!req.isAuthenticated() || req.user.role != "hiker") {
            return res.status(400).json({ error: 'Not logged in or wrong role' });
        }

        hikeDao.getHikeById(req.params.id)
            .then((hike) => {
                var result = hike;
                result.gpx_content = fs.readFileSync('./gpx_files/' + hike.gps_track + '.gpx');
                res.status(200).json(result);
            })
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hike` }));
});

// /api/hikes/filters?city=value&province=value&country=value&difficulty=value&track_length_min=value&track_length_max=value&ascent_min=value&ascent_max=value&expected_time_min=value&expected_time_max=value
router.get('/hikes/filters', async (req, res) => {

    const city = req.query.city;
    const province = req.query.province;
    const country = req.query.country;
    const difficulty = req.query.difficulty;
    const track_length_min = req.query.track_length_min;
    const track_length_max = req.query.track_length_max;
    const ascent_min = req.query.ascent_min;
    const ascent_max = req.query.ascent_max;
    const expected_time_min = req.query.expected_time_min;
    const expected_time_max = req.query.expected_time_max;

    hikeDao.getAllHikes()
        .then(async (hikes) => {
            var result = hikes;
            if (city) {
                result = result.filter(h => h.city == city);
            }
            if (province) {
                result = result.filter(h => h.province == province);
            }
            if (country) {
                result = result.filter(h => h.country == country);
            }
            if (difficulty) {
                result = result.filter(h => h.difficulty == difficulty);
            }
            if (track_length_min && track_length_max) {
                if (track_length_min >= 0.0 && track_length_max >= 0.0) {
                    result = result.filter(h => h.track_length >= track_length_min && h.track_length <= track_length_max);
                } else {
                    return res.status(400).json({ error: `Parameter error` });
                }
            }
            if (ascent_min && ascent_max) {
                if (ascent_min >= 0 && ascent_max >= 0) {
                    result = result.filter(h => h.ascent >= ascent_min && h.ascent <= ascent_max);
                } else {
                    return res.status(400).json({ error: `Parameter error` });
                }
            }
            if (expected_time_min && expected_time_max) {
                if (expected_time_min >= 0.0 && expected_time_max >= 0.0) {
                    result = result.filter(h => h.expected_time >= expected_time_min && h.expected_time <= expected_time_max);
                } else {
                    return res.status(400).json({ error: `Parameter error` });
                }
            }

            for (var hike of result) {
                hike.start = await utilsHike.getPoint(hike.start_point_type, hike.start_point_id);
                hike.end = await utilsHike.getPoint(hike.end_point_type, hike.end_point_id);
                const references = await referenceDao.getReferenceByHikeId(hike.id);
                hike.reference_points = [];
                for (const r of references) {
                    const point = await utilsHike.getPoint(r.ref_point_type, r.ref_point_id);
                    point[0].ref_point_type = r.ref_point_type;
                    hike.reference_points.push(point);
                }
                const author = await userDao.getUserById(hike.author_id)
                hike.author = author.name + " " + author.surname;
            }

            res.status(200).json(result);
        })
        .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
});

module.exports = router;
