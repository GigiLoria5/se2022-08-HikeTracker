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

const utilsHike = require('../utils/Utils_hike');

/////////////////////////////////////////////////////////////////////
//////                          POST                           //////
/////////////////////////////////////////////////////////////////////

router.post('/hikes',
    body('title').exists().isString().isLength({ min: 1 }),
    body('peak_altitude').exists().isNumeric().isFloat({ min: 0.0 }),
    body('ascent').exists().isNumeric().isFloat({ min: 0 }),
    body('track_length').exists().isNumeric().isFloat({ min: 0.0 }),
    body('expected_time').exists().isNumeric().isFloat({ min: 0.0 }),
    body('difficulty').exists().isNumeric().isInt({ min: 1, max: 3 }),
    body('city').exists().isString().isLength({ min: 1 }),
    body('province').exists().isString().isLength({ min: 1 }),
    body('country').exists().isString().isLength({ min: 1 }),
    body('description').exists().isString().isLength({ min: 1 }),
    check('start point').custom(async (value, { req }) => {
        const start_point = await JSON.parse(req.body.start_point);
        if (isNaN(start_point.latitude) ||
            isNaN(start_point.longitude) ||
            (start_point.description.length == 0)) throw "Invalid start point"
        return true;
    }),
    check('end point').custom(async (value, { req }) => {
        const end_point = await JSON.parse(req.body.end_point);
        if (isNaN(end_point.latitude) ||
            isNaN(end_point.longitude) ||
            (end_point.description.length == 0)) throw "Invalid start point"
        return true;
    }),

    check('gpx file').custom(async (value, { req }) => {
        if (!req.files) throw "no file uploaded";
        const sizeKB = req.files.gpx.size / 1024;
        if (sizeKB > 1024 * 10) throw "gpx file too large";
        if (req.files.gpx.mimetype != "application/gpx+xml") {
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
                    "location",
                    start_point_id,
                    "location",
                    end_point_id
                )
                let hike_id;

                /* Add hike after everything is correct */
                const id = await hikeDao.addHike(hike, author_id)
                hike_id = id;

                for (const p of JSON.parse(req.body.reference_points).points) {
                    const ref_point_id = await locationDao.addLocation(p);
                    hikeDao.addReferencePoint(id, "location", ref_point_id).catch(err => {
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

// /api/hike/:id
// Return all the information of an hikes if the user is an hiker
router.get('/hike/:id',
    check('id').exists().isInt(),

    async (req, res) => {
        const usersRoleGpxPermission = ['hiker', 'local_guide'];

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: "Fields validation failed" });
        }

        hikeDao.getHikeById(req.params.id)
            .then(async (hike) => {
                if (req.isAuthenticated() && usersRoleGpxPermission.includes(req.user.role)) {
                    hike.gpx_content = fs.readFileSync('./gpx_files/' + hike.gps_track + '.gpx', { encoding: 'utf8' });
                }
                hike.start = await utilsHike.getPoint(hike.start_point_type, hike.start_point_id);
                hike.end = await utilsHike.getPoint(hike.end_point_type, hike.end_point_id);
                const references = await referenceDao.getReferenceByHikeId(req.params.id);
                const reference_points = [];
                for (const r of references) {
                    const point = await utilsHike.getPoint(r.ref_point_type, r.ref_point_id);
                    point.ref_point_type = r.ref_point_type;
                    reference_points.push(point);
                }
                hike.reference_points = reference_points;
                const author = await userDao.getUserById(hike.author_id)
                hike.author = author.name + " " + author.surname;
                res.status(200).json(hike);
            })
            .catch((_) => { res.status(500).json({ error: `Database error while retrieving the hike` }); });
    });

// /api/hikes/filters?city=value&province=value&country=value&difficulty=value&track_length_min=value&track_length_max=value&ascent_min=value&ascent_max=value&expected_time_min=value&expected_time_max=value
router.get('/hikes/filters', async (req, res) => {

    const country = req.query.country;
    const province = req.query.province;
    const city = req.query.city;
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
                    point.ref_point_type = r.ref_point_type;
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
