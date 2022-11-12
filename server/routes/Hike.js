'use strict';

// import packages and classes
const express = require('express');
const { check, validationResult } = require('express-validator'); // validation middleware
//const { errorFormatter, isLoggedIn } = require('../utils/utils');
const hikeDao = require('../dao/HikeDAO');
const hutDao = require('../dao/HutDAO');
const locationDao = require('../dao/LocationDAO');
const parkingDao = require('../dao/ParkingDAO');
const referenceDao = require('../dao/ReferenceDAO');

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
                if(city != undefined) {
                    result = result.filter(h => h.city == city);
                }
                if(province != undefined){
                    result = result.filter(h => h.province == province);
                }
                if(country != undefined) {
                    result = result.filter(h => h.country == country);
                }
                if(difficulty != undefined){
                    result = result.filter(h => h.difficulty == difficulty);
                }
                if(track_length != undefined) {
                    if(track_length == "0-5"){
                        result = result.filter(h => h.track_length >= 0.0 && h.track_length <= 5.0);
                    } else if(track_length == "5-15"){
                        result = result.filter(h => h.track_length >= 5.0 && h.track_length <= 15.0);
                    } else if(track_length == "15-more"){
                        result = result.filter(h => h.track_length >= 15.0);            
                    } else{
                        return res.status(400).json({ error: `Parameter error` });
                    }
                }
                if(ascent != undefined){
                    if(ascent == "0-300"){
                        result = result.filter(h => h.ascent >= 0 && h.ascent <= 300);
                    } else if(ascent == "300-600"){
                        result = result.filter(h => h.ascent >= 300 && h.ascent <= 600);
                    } else if(ascent == "600-1000"){
                        result = result.filter(h => h.ascent >= 600 && h.ascent <= 1000);            
                    } else if(ascent == "1000-more"){
                        result = result.filter(h => h.ascent >= 1000);            
                    } else{
                        return res.status(400).json({ error: `Parameter error` });
                    }
                }
                if(expected_time != undefined) {
                    if(expected_time == "0-1"){
                        result = result.filter(h => h.expected_time >= 0.0 && h.expected_time <= 1.0);
                    } else if(expected_time == "1-3"){
                        result = result.filter(h => h.expected_time >= 1.0 && h.expected_time <= 3.0);
                    } else if(expected_time == "3-5"){
                        result = result.filter(h => h.expected_time >= 3.0 && h.expected_time <= 5.0);            
                    } else if(expected_time == "5-more"){
                        result = result.filter(h => h.expected_time >= 5.0);            
                    } else{
                        return res.status(400).json({ error: `Parameter error` });
                    } 
                }

                for (var hike of result){
                    if(hike.start_point_type == 'hut'){
                        const start = await hutDao.getHutById(hike.start_point_id);
                        hike.start = start;
                    } else if(hike.start_point_type == 'parking_lot') {
                        const start = await parkingDao.getParkingLotById(hike.start_point_id);
                        hike.start = start;
                    } else if(hike.start_point_type == 'location') {                        
                        const start = await locationDao.getLocationById(hike.start_point_id);
                        hike.start = start;
                    }
                    if(hike.end_point_type == 'hut'){
                        const end = await hutDao.getHutById(hike.end_point_id);
                        hike.end = end;
                    } else if(hike.end_point_type == 'parking_lot') {
                        const end = await parkingDao.getParkingLotById(hike.end_point_id);
                        hike.end = end;
                    } else if(hike.end_point_type == 'location') {                      
                        const end = await locationDao.getLocationById(hike.end_point_id);
                        hike.end = end;
                    }
                    const references = await referenceDao.getReferenceByHikeId(hike.id);
                    hike.reference_points = [];
                    for ( const r of references){
                        if( r.ref_point_type == 'hut'){
                            const point = await hutDao.getHutById(r.ref_point_id); 
                            point[0].ref_point_type = r.ref_point_type;
                            hike.reference_points.push(point);
                        } else if(r.ref_point_type == 'parking_lot') {
                            const point = await parkingDao.getParkingLotById(r.ref_point_id);
                            point[0].ref_point_type = r.ref_point_type;
                            hike.reference_points.push(point);
                        } else if(r.ref_point_type == 'location') {                        
                            const point = await locationDao.getLocationById(r.ref_point_id);
                            point[0].ref_point_type = r.ref_point_type;
                            hike.reference_points.push(point);
                        }
                    } 
                }
                
                res.status(200).json(result);
            })
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hikes` }));
});

module.exports = router;
