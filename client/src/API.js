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

/**
 * 
 * @param hike is a Hike descripted in ./Utils.js
 */
const createHike = async (hike) => {
    let response = await fetch(APIURL + '/hikes', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify(hike),
    });

    let err = new Error();
    if (!response.ok) {
        if (response.status === 500) {
            console.log(response.statusText)
            err.message = "500 INTERNAL SERVER ERROR";
            throw err;
        }
        else if (response.status === 422) {
            console.log(response.body)
            err.message = "422 UNPROCESSABLE ENTITY";
            throw err;
        }
        else if (response.status === 401) {
            console.log(response.body)
            err.message = "422 UNAUTHORIZED";
            throw err;
        }
        else {
            console.log(response.body)
            err.message = "OTHER ERROR"
            throw err;
        }
    }
}

/* NOT NEEDED
const uploadFile = async (formData) => {
    try {
        let response = await axios({
            method: "post",
            url: URL + "/uploadFile",              //need the server API URL
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });

        let err = new Error();
        if (!response.ok) {

            err.message = "OTHER ERROR"
            throw err;
        }
    } catch (error) {
        console.log(error)
    }

}
*/


const API = { logIn, logOut, getUserInfo, addUser, createHike, getAllHikes };
export default API;
