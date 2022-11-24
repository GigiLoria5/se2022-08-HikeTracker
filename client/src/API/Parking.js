import { APIURL } from './APIUrl';
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
        throw err;
    }
}

export {addParking}