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
    // TO BE MODIFIED
    // FOR NOW IS JUST A "MOCK"
    const response = await fetch(new URL('/api/countries', APIURL), { credentials: 'include' });
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
    // TO BE MODIFIED
    // FOR NOW IS JUST A "MOCK"
    const response = await fetch(new URL('/api/provinces/' + country, APIURL), { credentials: 'include' });
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
    // TO BE MODIFIED
    // FOR NOW IS JUST A "MOCK"
    const response = await fetch(new URL('/api/cities/' + province, APIURL), { credentials: 'include' });

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
 * @param {Object} filter an object with the following fields: city, province, country, difficulty, track_length, ascent, expected_time (null if not filtered by that field)
 * @returns Array of objects
 */
async function getHutsWithFilters(filter) {
    // TO BE MODIFIED
    // FOR NOW IS JUST A "MOCK"
    const hutType = ['alpine_hut', 'fixed_bivouac', 'unmanaged_hut', 'hiking_hut', 'other'];
    const fakeHut = {
        "name": "Rifugio Melezè",
        "city": "Carignano",
        "province": "Torino",
        "country": "Italy",
        "description": "It runs between ...",
        "address": "Pian Melezè, 1, 12020",
        "altitude": 1812,
        "beds_number": 50,
        "coordinates": "44.5741321312, 8.31231231",
        "phone_number": "0175956410",
        "email": "melezze@meleze.it",
        "website": "www.meleze.it",
        "author": "Martina Piccolo"
    };

    const fakeHutList = [];

    for (let i = 0; i < 10; i++) {
        const newHut = { ...fakeHut, id: i + 1, name: `${fakeHut.name} ${i}`, type: hutType[Math.floor(Math.random() * (4 - 0 + 1)) + 0] };
        fakeHutList.push(newHut);
    }

    return fakeHutList;
}

/**
 * 
 * @param {Number} hutId identifier of an hut
 * @returns Hut object
 */
async function getHutById(hutId) {
    // TO BE MODIFIED
    // FOR NOW IS JUST A "MOCK"
    const fakeHut = {
        "id": 1,
        "name": "Rifugio Melezè",
        "city": "Carignano",
        "province": "Torino",
        "country": "Italy",
        "description": "It runs between ...",
        "address": "Pian Melezè, 1, 12020",
        "altitude": 1812,
        "beds_number": 50,
        "coordinates": "44.5741321312, 8.31231231",
        "phone_number": "0175956410",
        "email": "melezze@meleze.it",
        "website": "www.meleze.it",
        "type": "alpine_hut",
        "author": "Martina Piccolo"
    };

    return fakeHut;
}

export { addHut, deleteHut, getHutsCountries, getHutsProvincesByCountry, getHutsCitiesByProvince, getHutsWithFilters, getHutById }
