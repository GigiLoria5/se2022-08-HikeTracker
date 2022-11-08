'use strict';

// import packages and classes
const express = require('express');
const { check, validationResult } = require('express-validator'); // validation middleware
const { errorFormatter, isLoggedIn } = require('../utils/utils');
const hikeDao = require('../dao/HikeDAO');
const hutDao = require('../dao/HutDAO');
const locationDao = require('../dao/LocationDAO');
const parkingDao = require('../dao/ParkingDAO');

const router = express.Router();

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
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        hikeDao.getProvincesByCountry(req.params.country)
            .then((provinces) => res.status(200).json(provinces))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the provinces` }));
});

// /api/cities/:province
// Return cities by a province
router.get('/cities/:province', 
    check('province').exists(),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        hikeDao.getCitiesByProvince(req.params.province)
            .then((cities) => res.status(200).json(cities))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the cities` }));
});

// /api/hikes/:city
// Return hikes by a city
router.get('/hikes/:city', 
    check('city').exists(),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        hikeDao.getHikeByCity(req.params.city)
            .then((hikes) => {
                if(hikes.start_point_type == "hut"){
                    hutDAO.getHutById(hikes.start_point_id)
                    .then((start_point) => hikes = {start_point: start_point})
                    .catch(() => res.status(501).json({ error: `Database error while retrieving the hut` }));

                } else if(hikes.start_point_type == "location"){
                    locationDAO.getLocationById(hikes.start_point_id)
                    .then((start_point) => hikes = {start_point: start_point})
                    .catch(() => res.status(502).json({ error: `Database error while retrieving the location` }));
                } else if(hikes.start_point_type == "parking_lot"){
                    parkingDAO.getParkingLotById(hikes.start_point_id)
                    .then((start_point) => hikes = {start_point: start_point})
                    .catch(() => res.status(503).json({ error: `Database error while retrieving the parking lot` }));
                }
                
                if(hikes.end_point_type == "hut"){
                    hutDAO.getHutById(hikes.end_point_id)
                    .then((end_point))
                    .catch(() => res.status(501).json({ error: `Database error while retrieving the hut` }));

                } else if(hikes.end_point_type == "location"){
                    locationDAO.getLocationById(hikes.end_point_id)
                    .then()
                    .catch(() => res.status(502).json({ error: `Database error while retrieving the location` }));
                } else if(hikes.end_point_type == "parking_lot"){
                    parkingDAO.getParkingLotById(hikes.end_point_id)
                    .then()
                    .catch(() => res.status(503).json({ error: `Database error while retrieving the parking lot` }));
                }
                res.status(200).json(hikes);
            })
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
});

// /api/hikes/:province
// Return hikes by a province
router.get('/hikes/:province', 
    check('province').exists(),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        hikeDao.getHikeByProvince(req.params.province)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
});

// /api/hikes/:country
// Return hikes by a country
router.get('/hikes/:country', 
    check('country').exists(),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        hikeDao.getHikeByCountry(req.params.country)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
});

// /api/hikes/:difficulty
// Return hikes by a difficulty
router.get('/hikes/:difficulty', 
    check('difficulty').exists().isInt().toInt(),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        hikeDao.getHikeByDifficulty(req.params.difficulty)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
});

// /api/hikes/:track_length
// Return hikes by a length
router.get('/hikes/:track_length', 
    check('track_length').exists(),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        hikeDao.getHikeByLength(req.params.track_length)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
});

// /api/hikes/:ascent
// Return hikes by an ascent
router.get('/hikes/:ascent', 
    check('ascent').exists().isInt().toInt(),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        hikeDao.getHikeByAscent(req.params.ascent)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
});

// /api/hikes/:expected_time
// Return hikes by an expected time
router.get('/hikes/:expected_time', 
    check('expected_time').exists(),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        hikeDao.getHikeByExpectedTime(req.params.expected_time)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
});

module.exports = router;