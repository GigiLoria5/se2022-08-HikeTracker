import { APIURL } from './APIUrl';
import { Hut } from './../Utils/Hut';
import { isPointInsideRange, splitCoordinates } from '../Utils/GeoUtils';

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
                    latitude:latitude,
                    longitude:longitude,
                    email: h.email,
                    website: h.website,
                    type: h.type,
                    author_id: h.author_id,
                    author: h.author
                }

            )
        });

        huts = huts.filter((h) => {return isPointInsideRange({ latitude: lat, longitude: lon }, radius, { latitude: h.latitude, longitude: h.longitude })});
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

export { addHut, getHutsByRadius, deleteHut }