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

const removeGpx = (name) => {
    fs.unlink(name, function (err, results) {
        if(err) throw new Error("unexpected error")
    });
}

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
            (!utilsHike.verifyPointDescription(start_point))) throw new Error("Invalid start point");
        return true;
    }),
    check('end point').custom(async (value, { req }) => {
        const end_point = await JSON.parse(req.body.end_point);
        if (isNaN(end_point.latitude) ||
            isNaN(end_point.longitude) ||
            (!utilsHike.verifyPointDescription(end_point))) throw new Error("Invalid end point");
        return true;
    }),

    check('gpx file').custom(async (value, { req }) => {
        if (!req.files) throw new Error("no file uploaded");
        const sizeKB = req.files.gpx.size / 1024;
        if (sizeKB > 1024 * 10) throw new Error("gpx file too large");
        if (req.files.gpx.mimetype != "application/gpx+xml") {
            const { fileTypeFromBuffer } = await import('file-type');
            const fileType = await fileTypeFromBuffer(req.files.gpx.data);
            if (fileType.mime != "application/xml") throw new Error("invalid gpx file");
        }
        return true;
    }),

    check('picture file').custom(async (value, { req }) => {
        if (!req.files) throw new Error("no file uploaded");
        const sizeKB = req.files.picture.size / 1024;
        if (sizeKB > 1024 * 10) throw new Error("picture file too large");
        if (req.files.picture.mimetype != "image/jpeg" && req.files.picture.mimetype != "image/png") {
            throw new Error("invalid picture file");
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
                throw new Error("no file uploaded");
            } else {
                const gpx = req.files.gpx;
                const picture = req.files.picture;
                const curdate = Date.now();
                const name = curdate + "_" + gpx.name.replace(/\.[^/.]+$/, "");
                const picture_name = curdate + "_" + picture.name;
                const author_id = req.user && req.user.id;

                const start_point = await JSON.parse(req.body.start_point);
                const end_point = await JSON.parse(req.body.end_point);

                const start_point_id = await utilsHike.setPoint(start_point);
                const end_point_id = await utilsHike.setPoint(end_point);
                
                const hike = new Hike({
                    title:req.body.title,
                    peak_altitude:req.body.peak_altitude,
                    city:req.body.city,
                    province:req.body.province,
                    country:req.body.country,
                    description:req.body.description,
                    ascent:req.body.ascent,
                    track_length:req.body.track_length,
                    expected_time:req.body.expected_time,
                    difficulty:req.body.difficulty,
                    gps_track:name,
                    picture:picture_name,
                    start_point_type:start_point.type,
                    start_point_id:start_point_id,
                    end_point_type:end_point.type,
                    end_point_id:end_point_id
                }
                )
                let hike_id;

                /* Add hike after everything is correct */
                const id = await hikeDao.addHike(hike, author_id)
                hike_id = id;

                for (const p of JSON.parse(req.body.reference_points).points) {
                    const ref_point_id = await locationDao.addLocation(p);
                    hikeDao.addReferencePoint(id, "location", ref_point_id).catch(err => {
                        hikeDao.deleteHike(id).then(_a => {
                            hikeDao.deleteReferencePoints(id);
                        });
                        throw new Error("error adding reference points");
                    })
                }

                //
                gpx.mv(`./gpx_files/${name}.gpx`, err => {
                    if (err) {
                        hikeDao.deleteHike(hike_id).then(_a => {
                            hikeDao.deleteReferencePoints(hike_id);
                        });
                        throw new Error("error saving gpx file");
                    }
                });


                picture.mv(`./pictures/${picture_name}`, err => {
                    if (err) {
                        hikeDao.deleteHike(hike_id).then(_a => {
                            hikeDao.deleteReferencePoints(hike_id);
                        });
                        removeGpx(`./gpx_files/${name}.gpx`);
                        throw new Error("error saving image file");
                    }
                })
                //send response
                res.status(201).send({
                    message: 'Hike uploaded'
                });
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    });


/////////////////////////////////////////////////////////////////////
//////                          GET                            //////
/////////////////////////////////////////////////////////////////////

// /api/hikes/countries
// Return the countries
router.get('/hikes/countries',
    async (req, res) => {
        hikeDao.getCountries()
            .then((countries) => res.status(200).json(countries))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the countries` }));
    });

// /api/hikes/provinces/:country
// Return provinces by a country
router.get('/hikes/provinces/:country',
    check('country').exists(),

    async (req, res) => {

        hikeDao.getProvincesByCountry(req.params.country)
            .then((provinces) => res.status(200).json(provinces))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the provinces` }));
    });

// /api/hikes/cities/:province
// Return cities by a province
router.get('/hikes/cities/:province',
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
                hike.picture_file = fs.readFileSync('./pictures/' + hike.picture)
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
            let result = hikes;
            const equalFilters = {
                city:city,
                province:province,
                country:country,
                difficulty:difficulty
            };

            const rangeFilters = {
                track_length : [track_length_min, track_length_max],
                ascent: [ascent_min, ascent_max],
                expected_time: [expected_time_min, expected_time_max]
            }

            Object.keys(equalFilters).forEach(key => {
                if(equalFilters[key]){
                    result = result.filter(h => equalFilters[key] == h[key]);
                }
            })
            
            for(const key in rangeFilters){
                if(rangeFilters[key][0] && rangeFilters[key][1]){
                    if (rangeFilters[key][0] >= 0.0 && rangeFilters[key][1] >= 0.0){
                        result = result.filter(h => h[key] >= rangeFilters[key][0] && h[key] <= rangeFilters[key][1]);
                    }
                    else{
                        return res.status(400).json({ error: `Parameter error` });
                    }
                }
            }

           

            for (let hike of result) {
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