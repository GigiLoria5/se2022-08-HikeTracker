//import axios from 'axios';

const APIURL = 'http://localhost:3001/api';

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


const API = {createHike};
export default API;