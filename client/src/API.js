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
// Return hikes by a city
async function getHikeByCity(city){
    const response = await fetch(new URL('/hikes/city/' + city, URL), {credentials: 'include'});
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

//get
// Return hikes by a province
async function getHikeByProvince(province){
    const response = await fetch(new URL('/hikes/province/' + province, URL), {credentials: 'include'});
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

//get
// Return hikes by a country
async function getHikeByCountry(country){
    const response = await fetch(new URL('/hikes/country/' + country, URL), {credentials: 'include'});
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

//get
// Return hikes by a difficulty
async function getHikeByDifficulty(difficulty){
    const response = await fetch(new URL('/hikes/difficulty/' + difficulty, URL), {credentials: 'include'});
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

//get
// Return hikes by a length
async function getHikeByLength(track_length){
    const response = await fetch(new URL('/hikes/length/' + track_length, URL), {credentials: 'include'});
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

//get
// Return hikes by an ascent
async function getHikeByAscent(ascent){
    const response = await fetch(new URL('/hikes/ascent/' + ascent, URL), {credentials: 'include'});
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

//get
// Return hikes by an expected time
async function getHikeByExpectedTime(expected_time){
    const response = await fetch(new URL('/hikes/expected_time/' + expected_time, URL), {credentials: 'include'});
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

//===========================================================================================
//          HUT API
//===========================================================================================

//get
// Return hut by an id
async function getHutById(id){
    const response = await fetch(new URL('/hut/' + id, URL), {credentials: 'include'});
    const hutJson = await response.json();
    if(response.ok){
        return hutJson.map((h) => ({id: h.id,
            name: h.name,
            city: h.city,
            province: h.province,
            country: h.country,
            address: h.address,
            phone_number: h.phone_number,
            altitude: h.altitude,
            description: h.description,
            beds_number: h.beds_number,
            opening_period: h.opening_period}));
    } else{
        throw hutJson;
    }
}

//===========================================================================================
//          LOCATION API
//===========================================================================================

//get
// Return location by an id
async function getLocationById(id){
    const response = await fetch(new URL('/location/' + id, URL), {credentials: 'include'});
    const locationJson = await response.json();
    if(response.ok){
        return locationJson.map((l) => ({id: l.id,
            value_type: l.value_type,
            value: l.value,
            description: l.description}));
    } else{
        throw locationJson;
    }
}

//===========================================================================================
//          PARKING API
//===========================================================================================

//get
// Return parking by an id
async function getParkingLotById(id){
    const response = await fetch(new URL('/parking/' + id, URL), {credentials: 'include'});
    const parkingJson = await response.json();
    if(response.ok){
        return parkingJson.map((p) => ({id: p.id,
            city: p.city,
            province: p.province,
            country: p.country,
            address: p.address}));
    } else{
        throw parkingJson;
    }
}

//===========================================================================================
//          REFERENCE POINT API
//===========================================================================================

//get
// Return reference points Id and type by an hike id
async function getReferenceByHikeId(hike_id){
    const response = await fetch(new URL('/reference/' + hike_id, URL), {credentials: 'include'});
    const referenceJson = await response.json();
    if(response.ok){
        return referenceJson.map((r) => ({hike_id: r.hike_id,
            ref_point_type: r.ref_point_type,
            ref_point_id: r.ref_point_id}));
    } else{
        throw referenceJson;
    }
}

const API = {getCountries, getProvincesByCountry, getCitiesByProvince, getHikeByCity, getHikeByProvince, getHikeByCountry, getHikeByDifficulty, getHikeByLength, getHikeByAscent, getHikeByExpectedTime, getHutById, getLocationById, getParkingLotById, getReferenceByHikeId};
export default API;