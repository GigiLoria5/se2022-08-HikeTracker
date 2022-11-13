import { APIURL } from './APIUrl';

/* Performs login, Input: {email, password} Output: user {id,name,email,score} */
const logIn = async (credentials) => {
    const url = APIURL + '/api/sessions';
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
    const response = await fetch(APIURL + '/api/sessions/current', {
        method: 'DELETE',
        credentials: 'include'
    });
    if (response.ok)
        return null;
};

/* Returns user information when performing refresh operation, retrieving the current session data*/
const getUserInfo = async () => {
    const response = await fetch(APIURL + '/api/sessions/current', {
        credentials: 'include',
    });
    const user = await response.json();
    if (response.ok) {
        return user;
    } else {
        throw user;
    }
};

/* Add the the user specified as parameter, credentials required  */
async function addUser(credentials) {
    const url = APIURL + '/api/users';
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

export { logIn, logOut, getUserInfo, addUser };