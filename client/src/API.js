'use strict'

const APIURL = 'http://localhost:3001'

/* Performs login, Input: {email, password} Output: user {id,name,email,score} */
const logIn = async (credentials) => {
    const url = APIURL + '/sessions';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
    });
    if (response.ok) {
        const user = await response.json();
        return user;
    }
    else {
        const errDetails = await response.text();
        throw errDetails;
    }
};

/* Performs logout Input: credentials */
const logOut = async () => {
    const response = await fetch(APIURL + '/sessions/current', {
        method: 'DELETE',
        credentials: 'include'
    });
    if (response.ok)
        return null;
}

/* Returns user information when performing refresh operation, retrieving the current session data*/
const getUserInfo = async () => {
    const response = await fetch(APIURL + '/sessions/current', {
        credentials: 'include',
    });
    const user = await response.json();
    if (response.ok) {
        return user;
    } else {
        throw user; 
    }
};

/* Addthe the user specified as parameter, credentials required  */
async function addUser(credentials) {
    const url = APIURL + '/users';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials),
        });
        if (response.ok) {
            return true;
        } else {
            /* Application error (404, 500, 503 ...) */
            const errDetails = await response.text();
            throw errDetails;
        }
    } catch (err) {
        /* Network error */
        throw err;
    }
}

//===========================================================================================
//          HIKE API
//===========================================================================================

/**
 * 
 * @param hike is a Hike descripted in ./Utils.js
 */
const createHike = async (hike) => {
    let response = await fetch(APIURL + '/hikes', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify(hike),
    });

    let err = new Error();
    if (!response.ok) {
        if (response.status === 500) {
            console.log(response.statusText)
            err.message = "500 INTERNAL SERVER ERROR";
            throw err;
        }
        else if (response.status === 422) {
            console.log(response.body)
            err.message = "422 UNPROCESSABLE ENTITY";
            throw err;
        }
        else if (response.status === 401) {
            console.log(response.body)
            err.message = "422 UNAUTHORIZED";
            throw err;
        }
        else {
            console.log(response.body)
            err.message = "OTHER ERROR"
            throw err;
        }
    }
}

/* NOT NEEDED
const uploadFile = async (formData) => {
    try {
        let response = await axios({
            method: "post",
            url: URL + "/uploadFile",              //need the server API URL
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });

        let err = new Error();
        if (!response.ok) {

            err.message = "OTHER ERROR"
            throw err;
        }
    } catch (error) {
        console.log(error)
    }

}
*/

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
    if(city != null && city != '')
        data.city = city;
    if(province != null && province != '')
        data.province = province;
    if(country != null && country != '')
        data.country = country;
    if(difficulty != null && difficulty != '')
        data.difficulty = difficulty;
    if(track_length != null && track_length != '')
        data.track_length = track_length;
    if(ascent != null && ascent != '')
        data.ascent = ascent;
    if(expected_time != null && expected_time != '')
        data.expected_time = expected_time;
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

const API = { logIn, logOut, getUserInfo, addUser, createHike, getCountries, getProvincesByCountry, getCitiesByProvince, getHikesWithFilters};
export default API;
