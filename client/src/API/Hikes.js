import { APIURL } from './APIUrl';

/**
 *
 * @param hike is a Hike descripted in ./Util/Hike.js
 */
const createHike = async (hike) => {
    const formData = new FormData();
    for (const c in hike) {
        if (c === "reference_points")
            formData.append(c, JSON.stringify({ "points": hike[c] }))
        else if (c === "start_point" || c === "end_point")
            formData.append(c, JSON.stringify(hike[c]))
        else
            formData.append(c, hike[c]);
    }

    let response = await fetch(APIURL + '/api/hikes', {
        method: 'POST',
        credentials: 'include',
        body: formData,
    });

    let err = new Error();
    if (response.ok) {
        return true;
    }
    switch (response.status) {
        case 500:
            err.message = "500 INTERNAL SERVER ERROR";
            break;
        case 422:
            err.message = "422 UNPROCESSABLE ENTITY";
            break;
        case 401:
            err.message = "401 UNAUTHORIZED";
            break;
        default:
            err.message = "OTHER ERROR";
            break;
    }
    throw err;
};

// get
// Return the countries
async function getCountries() {
    const response = await fetch(new URL('/api/hikes/countries', APIURL), { credentials: 'include' });
    const countriesJson = await response.json();
    if (response.ok) {
        return countriesJson.map((c) => ({ country: c.country }));
    } else {
        throw countriesJson;
    }
}

// get
// Return provinces by a country
async function getProvincesByCountry(country) {
    const response = await fetch(new URL('/api/hikes/provinces/' + country, APIURL), { credentials: 'include' });
    const provincesJson = await response.json();
    if (response.ok) {
        return provincesJson.map((p) => ({ province: p.province }));
    } else {
        throw provincesJson;
    }
}

// get
// Return cities by a province
async function getCitiesByProvince(province) {
    const response = await fetch(new URL('/api/hikes/cities/' + province, APIURL), { credentials: 'include' });

    const citiesJson = await response.json();
    if (response.ok) {
        return citiesJson.map((c) => ({ city: c.city }));
    } else {
        throw citiesJson;
    }
}

// get
// Return hikes by the filters
/**
 * 
 * @param {Object} filter an object with the following fields: city, province, country, difficulty, track_length, ascent, expected_time (null if not filtered by that field)
 * @returns Array of objects
 */
async function getHikesWithFilters(filter) {
    // Remove "null" field from the filter because the server does not want them specified
    Object.keys(filter).forEach(key => {
        if (filter[key] === null) {
            delete filter[key];
        }
    });

    const searchParams = new URLSearchParams(filter);
    const response = await fetch(new URL('/api/hikes/filters?' + searchParams, APIURL), { credentials: 'include' });
    const hikesJson = await response.json();
    if (response.ok) {
        return hikesJson.map((h) => ({
            id: h.id,
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
            reference_points: h.reference_points,
            author: h.author
        }));
    } else {
        throw hikesJson;
    }
}

/**
 * 
 * @param {Number} hikeId identifier of an hike
 * @returns Hike object
 */
function getHikeById(hikeId) {
    return new Promise((resolve, reject) => {
        fetch(new URL(`/api/hike/${hikeId}`, APIURL), {
            method: "GET",
            credentials: "include"
        })
            .then(async (response) => {
                if (response.ok) {
                    const hike = await response.json();
                    resolve(hike);
                } else {
                    // errors
                    response.json()
                        .then((message) => { reject(message); }) // error(s) message in the response body
                        .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
                }
            })
            .catch(() => { reject({ error: "Cannot communicate with the server." }) });
    });
}

export { createHike, getCountries, getProvincesByCountry, getCitiesByProvince, getHikesWithFilters, getHikeById };