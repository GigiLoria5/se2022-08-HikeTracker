import { APIURL } from './APIUrl';
import { Parking } from '../Utils/Parking';
import { isPointInsideRange, splitCoordinates } from '../Utils/GeoUtils';

/* Credentials required  */
/**
 *
 * @param parking is a parking lot descripted in ./Utils/Parking.js
 */
async function addParking(parking) {
    const url = APIURL + '/api/parking';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(parking),
        });
        if(response.ok) {
            return true;
        } else {
            const errDetails = await response.text();
            throw errDetails;
        }
    } catch(err) {
        console.log(err);
        throw err;
    }
}

/**
 * 
 * @param {*} lat 
 * @param {*} lon 
 * @param {*} radius (max distance in meters)
 * @returns an array of Parking objects
 */
async function getParkingsByRadius(lat, lon, radius) {

    const response = await fetch(new URL('/api/parking', APIURL));
    const parkingsJson = await response.json();

    if (response.ok) {
        let parkings = parkingsJson.map((p) => {
            const [latitude, longitude] = splitCoordinates(p.coordinates);
            return new Parking( 
            p.id, 
            p.city, 
            p.province, 
            p.country, 
            longitude, 
            latitude, 
            p.address
        )
    });

    console.log(parkings)

        parkings = parkings.filter((p) => {return isPointInsideRange({latitude:lat, longitude:lon}, radius, {latitude:p.latitude, longitude:p.longitude})});
        return parkings;

    } else {
        throw parkingsJson;
    }
}

async function deleteParking(parkingAddress) {
    const url = APIURL + '/api/parking/address/' + parkingAddress;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
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

export {addParking, getParkingsByRadius, deleteParking}