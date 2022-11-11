const APIURL = 'http://localhost:3001/api';

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

/* Addthe riddle specified as parameter, credentials required  */
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
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (err) {
        /* Network error */
        throw err;
    }
}


//get 
//return a Service object given its id 
async function getAllHikes() {
    const url = APIURL + '/hikes/all' ; 

    try {
        const response = await fetch(url);
        /* Fetch request accepted */
        if (response.ok) {
            
            const jsonhikes = await response.json();
            return jsonhikes;

        } else {
            /* Application error (404, 500, 503 ...) */
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (err) {
        /* Network error */
        throw err;
    }
}

const API ={ logIn, logOut, getUserInfo, addUser, getAllHikes };
export default API;
