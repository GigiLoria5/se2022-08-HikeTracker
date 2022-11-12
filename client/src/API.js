'use strict'

const APIURL = 'http://localhost:3001'

//===========================================================================================
//          HIKE API
//===========================================================================================

//get
// Return the countries
async function getCountries(){
    const response = await fetch(new URL('/api/countries', APIURL), {credentials: 'include'});
    const countriesJson = await response.json();
    if(response.ok){
        return countriesJson.map((c) => ({country: c.country}));
    } else{
        throw countriesJson;
    }
}

//get
// Return provinces by a country
async function getProvincesByCountry(country){
    const response = await fetch(new URL('/api/provinces/' + country, APIURL), {credentials: 'include'});
    const provincesJson = await response.json();
    if(response.ok){
        return provincesJson.map((p) => ({province: p.province}));
    } else{
        throw provincesJson;
    }
}

//get
// Return cities by a province
async function getCitiesByProvince(province){
    const response = await fetch(new URL('/api/cities/' + province, APIURL), {credentials: 'include'});

    const citiesJson = await response.json();
    if(response.ok){
        return citiesJson.map((c) => ({city: c.city}));
    } else{
        throw citiesJson;
    }
}

//get
// Return hikes by the filters
async function getHikesWithFilters(city, province, country, difficulty, track_length, ascent, expected_time ){
    var data = {};
    if(city != null && city != ''){
        data = { city: city };
    }
    if(province != null && province != ''){
        data = { province: province };
    }
    if(country != null && country != ''){
        data = { country: country };
    }
    if(difficulty != null && difficulty != ''){
        data = { difficulty: difficulty };
    }
    if(track_length != null && track_length != ''){
        data = { track_length: track_length };
    }
    if(ascent != null && ascent != ''){
        data = { ascent: ascent };
    }
    if(expected_time != null && expected_time != ''){
        data = { expected_time: expected_time };
    }

    const searchParams = new URLSearchParams(data);
    const response = await fetch(new URL('/api/hikes/filters?' + searchParams, APIURL), {credentials: 'include'});
    const hikesJson = await response.json();
    if(response.ok){
        return hikesJson.map((h) => ({id: h.id,
            title: h.title, 
            peak_altitude: h.peak_altitude,
            city: h.city,
            province: h.province,
            country: h.country, 
            description: h.description, 
            ascent: h.ascent,
            track_length: h.track_length, 
            expected_time: h.expected_time, 
            difficulty: h.difficulty, 
            start_point_type: h.start_point_type, 
            start_point_id: h.start_point_id, 
            end_point_type: h.end_point_type,
            end_point_id: h.end_point_id,
            start: h.start,
            end: h.end,
            reference_points: h.reference_points}));
    } else{
        throw hikesJson;
    }
}

const API = {getCountries, getProvincesByCountry, getCitiesByProvince, getHikesWithFilters};
export default API;