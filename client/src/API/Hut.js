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
            body: JSON.stringify({"hutName": hutName}),
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

export {addHut,deleteHut}