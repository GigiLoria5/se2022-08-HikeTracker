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

//===========================================================================================
//          HUT API
//===========================================================================================

//===========================================================================================
//          LOCATION API
//===========================================================================================

//===========================================================================================
//          PARKING API
//===========================================================================================

//===========================================================================================
//          REFERENCE POINT API
//===========================================================================================

const API = {getCountries, getProvincesByCountry, getCitiesByProvince};
export default API;