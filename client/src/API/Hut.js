import { APIURL } from './APIUrl';
/* Add the the user specified as parameter, credentials required  */
/**
 *
 * @param hut is a Hut descripted in ./Utils/Hut.js
 */
async function addHut(hut) {
    const url = APIURL + '/api/huts';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(hut),
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
    let hut_types = [];
    // Remove "null" field from the filter because the server does not want them specified
    Object.keys(filter).forEach(key => {
        if (key === "type"){
            hut_types = filter[key];
            filter[key] = null;
        }
        if (filter[key] === null) {
            delete filter[key];
        }
    });

    const searchParams = new URLSearchParams(filter);
    if (Array.isArray(hut_types)) {
        for (let type of hut_types) {
            searchParams.append("hut_type", type);
        }
    } else {
        searchParams.append("hut_type", hut_types);
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


export { addHut, deleteHut, getHutsCountries, getHutsProvincesByCountry, getHutsCitiesByProvince, getHutsWithFilters, getHutById }