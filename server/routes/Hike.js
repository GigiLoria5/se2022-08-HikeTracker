'use strict';

// import packages and classes
const express = require('express');
const { check, validationResult } = require('express-validator'); // validation middleware
//const { errorFormatter, isLoggedIn } = require('../utils/utils');
const hikeDao = require('../dao/HikeDAO');

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

// /api/hikes/city/:city
// Return hikes by a city
router.get('/hikes/city/:city', 
    check('city').exists(),

    async (req, res) => {

        hikeDao.getHikeByCity(req.params.city)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
});

// /api/hikes/province/:province
// Return hikes by a province
router.get('/hikes/province/:province', 
    check('province').exists(),

    async (req, res) => {

        hikeDao.getHikeByProvince(req.params.province)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
});

// /api/hikes/country/:country
// Return hikes by a country
router.get('/hikes/country/:country', 
    check('country').exists(),

    async (req, res) => {

        hikeDao.getHikeByCountry(req.params.country)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
});

// /api/hikes/difficulty/:difficulty
// Return hikes by a difficulty
router.get('/hikes/difficulty/:difficulty', 
    check('difficulty').exists().isInt().toInt(),

    async (req, res) => {

        hikeDao.getHikeByDifficulty(req.params.difficulty)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
});

// /api/hikes/length/:track_length
// Return hikes by a length
router.get('/hikes/length/:track_length', 
    check('track_length').exists(),

    async (req, res) => {

        if(req.params.track_length == "0-5"){
            hikeDao.getHikeByLength(0.0,5.0)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
        } else if(req.params.track_length == "5-15"){
            hikeDao.getHikeByLength(5.0,15.0)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
        } else if(req.params.track_length == "15-more"){
            hikeDao.getHikeByLength(15.0,0.0)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
        } else {
            res.status(400).json({ error: `Parameter not valid` });
        }
});

// /api/hikes/ascent/:ascent
// Return hikes by an ascent
router.get('/hikes/ascent/:ascent', 
    check('ascent').exists(),

    async (req, res) => {

        if(req.params.ascent == "0-300"){
            hikeDao.getHikeByAscent(0,300)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
        } else if(req.params.ascent == "300-600") {
            hikeDao.getHikeByAscent(300,600)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
        } else if(req.params.ascent == "600-1000") {
            hikeDao.getHikeByAscent(600,1000)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
        } else if(req.params.ascent == "1000-more") {
            hikeDao.getHikeByAscent(1000,0)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
        } else {
            res.status(400).json({ error: `Parameter not valid` });
        }
});

// /api/hikes/expected_time/:expected_time
// Return hikes by an expected time
router.get('/hikes/expected_time/:expected_time', 
    check('expected_time').exists(),

    async (req, res) => {

        if(req.params.expected_time == "0-1"){
            hikeDao.getHikeByExpectedTime(0.0,1.0)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
        } else if(req.params.expected_time == "1-3") {
            hikeDao.getHikeByExpectedTime(1.0,3.0)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
        } else if(req.params.expected_time == "3-5") {
            hikeDao.getHikeByExpectedTime(3.0,5.0)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
        } else if(req.params.expected_time == "5-more") {
            hikeDao.getHikeByExpectedTime(5.0,0.0)
            .then((hikes) => res.status(200).json(hikes))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
        } else {
            res.status(400).json({ error: `Parameter not valid` });
        }
});

module.exports = router;