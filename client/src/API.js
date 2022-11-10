'use strict'

const URL = 'http://localhost:3001/api';

//===========================================================================================
//          HIKE API
//===========================================================================================

//get
// Return the countries
async function getCountries(){
    const response = await fetch(new URL('/countries', URL), {credentials: 'include'});
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
    const response = await fetch(new URL('/provinces/' + country, URL), {credentials: 'include'});
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
    const response = await fetch(new URL('/cities/' + province, URL), {credentials: 'include'});
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
    if(city != null){
        data = { city: city };
    }
    if(province != null){
        data = { province: province };
    }
    if(country != null){
        data = { country: country };
    }
    if(difficulty != null){
        data = { difficulty: difficulty };
    }
    if(track_length != null){
        data = { track_length: track_length };
    }
    if(ascent != null){
        data = { ascent: ascent };
    }
    if(expected_time != null){
        data = { expected_time: expected_time };
    }

    const searchParams = new URLSearchParams(data);
    const response = await fetch(new URL('/hikes/filters?' + searchParams, URL), {credentials: 'include'});
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
            track_length: h.track_length, expected_time: h.expected_time, difficulty: h.difficulty, start_point_type: h.start_point_type, 
            start_point_id: h.start_point_id, 
            end_point_type: h.end_point_type,
            end_point_id: h.end_point_id}));
    } else{
        throw hikesJson;
    }
}

const API = {getCountries, getProvincesByCountry, getCitiesByProvince, getHikesWithFilters};
export default API;