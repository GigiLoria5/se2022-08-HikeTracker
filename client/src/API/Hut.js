import { APIURL } from './APIUrl';
import { Hut } from './../Utils/Hut';
import { isPointInsideRange, splitCoordinates } from '../Utils/GeoUtils';

/* Add the the user specified as parameter, credentials required  */
/**
 *
 * @param hut is a Hut descripted in ./Utils/Hut.js
 */
async function addHut(hut) {
    const formData = new FormData();
    for (const c in hut)
        formData.append(c, hut[c]);

    try {
        const response = await fetch(APIURL + '/api/huts', {
            method: 'POST',
            credentials: 'include',
            body: formData,
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

/**
 * 
 * @param {*} lat 
 * @param {*} lon 
 * @param {*} radius (max distance in meters)
 * @returns an array of Hut objects
 */
async function getHutsByRadius(lat, lon, radius) {

    const response = await fetch(new URL('/api/huts', APIURL));
    const hutsJson = await response.json();

    if (response.ok) {
        let huts = hutsJson.map((h) => {
            const [latitude, longitude] = splitCoordinates(h.coordinates);
            return new Hut(
                {
                    id: h.id,
                    name: h.name,
                    city: h.city,
                    province: h.province,
                    country: h.country,
                    address: h.address,
                    phone_number: h.hphone_number,
                    altitude: h.altitude,
                    description: h.description,
                    beds_number: h.beds_number,
                    opening_period: h.opening_period,
                    latitude: latitude,
                    longitude: longitude,
                    email: h.email,
                    website: h.website,
                    type: h.type,
                    author_id: h.author_id,
                    author: h.author
                }

            )
        });

        huts = huts.filter((h) => { return isPointInsideRange({ latitude: lat, longitude: lon }, radius, { latitude: h.latitude, longitude: h.longitude }) });
        return huts;

    } else {
        throw hutsJson;
    }
}

async function deleteHut(hutName) {
    const url = APIURL + '/api/huts/name';
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ "hutName": hutName }),
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
        console.log(err);
        throw err;
    }
}

// get
// Return the countries
async function getHutsCountries() {
    const response = await fetch(new URL('/api/huts/countries', APIURL), { credentials: 'include' });
    const countriesJson = await response.json();
    if (response.ok) {
        return countriesJson.map((c) => ({ country: c.country }));
    } else {
        throw countriesJson;
    }
}

// get
// Return provinces by a country
async function getHutsProvincesByCountry(country) {
    const response = await fetch(new URL('/api/huts/provinces/' + country, APIURL), { credentials: 'include' });
    const provincesJson = await response.json();
    if (response.ok) {
        return provincesJson.map((p) => ({ province: p.province }));
    } else {
        throw provincesJson;
    }
}

// get
// Return cities by a province
async function getHutsCitiesByProvince(province) {
    const response = await fetch(new URL('/api/huts/cities/' + province, APIURL), { credentials: 'include' });
    const citiesJson = await response.json();
    if (response.ok) {
        return citiesJson.map((c) => ({ city: c.city }));
    } else {
        throw citiesJson;
    }
}

// get
// Return huts by the filters
/**
 * 
 * @param {Object} filter an object with the following fields: city, province, country, type, altitude_min, altitude_max, beds_number_min and beds_number_max
 * The type field can be a string or an array of string
 * @returns Array of objects
 */
async function getHutsWithFilters(filter) {
    // Remove "null" field from the filter because the server does not want them specified
    Object.keys(filter).forEach(key => {
        if (filter[key] === null) {
            delete filter[key];
        }
    });

    const searchParams = new URLSearchParams(filter);
    searchParams.delete('hut_type');
    if (Array.isArray(filter.hut_type)) {
        for (let type of filter.hut_type) {
            searchParams.append("hut_type", type);
        }
    }
    const response = await fetch(new URL('/api/huts/filters?' + searchParams, APIURL), { credentials: 'include' });
    const hutsJson = await response.json();
    if (response.ok) {
        return hutsJson.map((h) => ({
            id: h.id,
            name: h.name,
            city: h.city,
            province: h.province,
            country: h.country,
            address: h.address,
            phone_number: h.phone_number,
            altitude: h.altitude,
            description: h.description,
            beds_number: h.beds_number,
            coordinates: h.coordinates,
            email: h.email,
            website: h.website,
            type: h.type,
            author: h.author
        }));
    } else {
        throw hutsJson;
    }
}

/**
 * 
 * @param {Number} hutId identifier of an hut
 * @returns Hut object
 */
async function getHutById(hutId) {
    return new Promise((resolve, reject) => {
        fetch(new URL(`/api/hut/${hutId}`, APIURL), {
            method: "GET",
            credentials: "include"
        })
            .then(async (response) => {
                if (response.ok) {
                    const hut = await response.json();
                    resolve(hut);
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


export { addHut, deleteHut, getHutsCountries, getHutsProvincesByCountry, getHutsCitiesByProvince, getHutsWithFilters, getHutById, getHutsByRadius }
