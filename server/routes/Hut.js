'use strict';

// import packages and classes
const express = require('express');
const Hut = require('../models/Hut');

const { body, check, query, validationResult } = require('express-validator'); // validation middleware
const HutDAO = require('../dao/HutDAO');
const UserDAO = require('../dao/UserDAO');
const { route } = require('./User');
const router = express.Router();

const utilsHut = require('../utils/Utils_hut');

/////////////////////////////////////////////////////////////////////
//////                          GET                            //////
/////////////////////////////////////////////////////////////////////

// /api/huts/countries
// Return the countries
router.get('/huts/countries',
    async (req, res) => {
        const usersRole = ['hiker', 'local_guide'];
        if (usersRole.includes(req.user.role) && req.isAuthenticated()) {
            HutDAO.getCountries()
                .then((countries) => res.status(200).json(countries))
                .catch(() => res.status(500).json({ error: `Database error while retrieving the countries` }));
        } else {
            return res.status(401).json({ error: "Unauthorized to execute this operation!" });
        }

    });

// /api/huts/provinces/:country
// Return provinces by a country
router.get('/huts/provinces/:country',
    check('country').exists({ checkNull: true }).not().isInt().not().isDecimal(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: "Fields validation failed!" });
        }

        const usersRole = ['hiker', 'local_guide'];
        if (usersRole.includes(req.user.role) && req.isAuthenticated()) {
            HutDAO.getProvincesByCountry(req.params.country)
                .then((provinces) => res.status(200).json(provinces))
                .catch(() => res.status(500).json({ error: `Database error while retrieving the provinces` }));
        } else {
            return res.status(401).json({ error: "Unauthorized to execute this operation!" });
        }

    });

// /api/huts/cities/:province
// Return cities by a province
router.get('/huts/cities/:province',
    check('province').exists({ checkNull: true }).not().isInt().not().isDecimal(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: "Fields validation failed!" });
        }

        const usersRole = ['hiker', 'local_guide'];
        if (usersRole.includes(req.user.role) && req.isAuthenticated()) {
            HutDAO.getCitiesByProvince(req.params.province)
                .then((cities) => res.status(200).json(cities))
                .catch(() => res.status(500).json({ error: `Database error while retrieving the cities` }));
        } else {
            return res.status(401).json({ error: "Unauthorized to execute this operation!" });
        }
    });

router.get('/hut/:id',
    check('id').exists().isInt(),

    async (req, res) => {
        const usersRole = ['hiker', 'local_guide'];
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: "Fields validation failed" });
        }

        if (usersRole.includes(req.user.role) && req.isAuthenticated()) {
            HutDAO.getHutById(req.params.id)
                .then(async (hut) => {
                    res.status(200).json(hut);
                })
                .catch((_) => { res.status(500).json({ error: `Database error while retrieving the hut` }); });
        } else {
            return res.status(401).json({ error: "Unauthorized to execute this operation!" });
        }
    });

// /api/huts/filters?city=value&province=value&country=value&altitude_min=value&altitude_max=value&beds_number_min=value&beds_number_max=value&hut_type=value&hut_type=value
router.get('/huts/filters', [
    query('city').optional({ nullable: true }).not().isInt().not().isDecimal(),
    query('province').optional({ nullable: true }).not().isInt().not().isDecimal(),
    query('country').optional({ nullable: true }).not().isInt().not().isDecimal(),
    query('altitude_min').optional({ nullable: true }).isInt(),
    query('altitude_max').optional({ nullable: true }).isInt(),
    query('beds_number_min').optional({ nullable: true }).isInt({ min: 0 }),
    query('beds_number_max').optional({ nullable: true }).isInt({ min: 0 }),

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: "Fields validation failed" });
    }

    const country = req.query.country;
    const province = req.query.province;
    const city = req.query.city;
    const altitude_min = req.query.altitude_min;
    const altitude_max = req.query.altitude_max;
    const beds_number_min = req.query.beds_number_min;
    const beds_number_max = req.query.beds_number_max;
    const hut_type = req.query.hut_type;

    const usersRole = ['hiker', 'local_guide'];

    if (!usersRole.includes(req.user.role) || !req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized to execute this operation!" });
    }
    HutDAO.getAllHuts()
        .then((huts) => {
            let result = huts;
            const equalFilters = {
                city: city,
                province: province,
                country: country,
            };

            const rangeFilters = {
                altitude: [parseInt(altitude_min), parseInt(altitude_max)],
                beds_number: [parseInt(beds_number_min), parseInt(beds_number_max)]
            }

            //Filter by equal filters (city, province, country)
            Object.keys(equalFilters).forEach(key => {
                if (equalFilters[key]) {
                    result = result.filter(h => equalFilters[key] == h[key]);
                }
            })

            //Filter by range filters (altitudemin-altitudemax, bedsnumbermin-bedsnumbermax)
            result = utilsHut.handleRangeFilters(result, rangeFilters);
            if (result === -1) {
                return res.status(422).json({ error: "Fields validation failed" });
            }

            //Filter by hut type
            if (hut_type) {
                result = utilsHut.handleHutType(result, hut_type);
                if (result === -1) {
                    return res.status(422).json({ error: "Fields validation failed" });
                }
            }

            res.status(200).json(result);
        })
        .catch(() => res.status(500).json({ error: `Database error while retrieving the huts` }));
});

/////////////////////////////////////////////////////////////////////
//////                          POST                           //////
/////////////////////////////////////////////////////////////////////

// POST /api/hut
router.post('/huts', [
    body('name').isString(),
    body('type').isString().isIn(['alpine_hut', 'fixed_bivouac', 'unmanaged_hut', 'hiking_hut', 'other']),
    body('beds_number').isNumeric().isInt({ min: 0 }),
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
                const hut = new Hut({
                    id: 0,
                    name: req.body.name,
                    city: req.body.city,
                    province: req.body.province,
                    country: req.body.country,
                    address: req.body.address,
                    altitude: req.body.altitude,
                    description: req.body.description,
                    beds_number: req.body.beds_number,
                    opening_period: "",
                    coordinates: (req.body.latitude + ", " + req.body.longitude),
                    phone_number: req.body.phone_number,
                    email: req.body.email,
                    website: req.body.website,
                    type: req.body.type
                })

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
                return res.status(401).json({ error: "Unauthorized to execute this operation!" });
            }
        }
        return res.status(401).json({ error: 'Not authorized' });



    } catch (err) {
        return res.status(503).json({ error: err });
    }
});

/////////////////////////////////////////////////////////////////////
//////                        DELETE                           //////
/////////////////////////////////////////////////////////////////////

router.delete('/huts', [body('hutId').exists().isNumeric()], async (req, res) => {
    try {
        if (req.isAuthenticated()) {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: "Fields validation failed!" });
            }

            await HutDAO.deleteHut(req.body.hutId, req.user.id)
                .then(() => res.status(200).end())
                .catch(() => res.status(500).json({ error: `Database error` }));


        } else {
            return res.status(401).json({ error: 'Not authorized' });
        }
    } catch (err) {
        return res.status(503).json({ error: err });
    }
});

router.delete('/huts/name', [body('hutName').exists().isString()], async (req, res) => {
    try {
        if (req.isAuthenticated()) {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: "Fields validation failed!" });
            }

            await HutDAO.deleteHutByName(req.body.hutName, req.user.id)
                .then(() => res.status(200).end())
                .catch(() => res.status(500).json({ error: `Database error` }));


        } else {
            return res.status(401).json({ error: 'Not authorized' });
        }
    } catch (err) {
        return res.status(503).json({ error: err });
    }
});

/////////////////////////////////////////////////////////////////////
//////                          GET                            //////
/////////////////////////////////////////////////////////////////////

router.get('/huts', async (req, res) => {
    try {
        const huts = await HutDAO.getAllHuts();
        return res.status(200).json(huts);
    }
    catch (err) {
        return res.status(500).json({ error: `Database error` })
    };
});

module.exports = router;
