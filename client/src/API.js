import axios from 'axios';

const URL = 'http://localhost:3001/api';

function Hike(
    title,
    peak_altitude,
    city,
    province,
    country,
    description,
    ascent,
    track_length,
    expected_time,
    difficulty,
    start_point_type,
    start_point_id,
    end_point_type,
    end_point_id,
    reference_points
) {
    this.title = title;
    this.peak_altitude = peak_altitude;
    this.city = city;
    this.province = province;
    this.country = country;
    this.description = description;
    this.ascent = ascent;
    this.track_length = track_length;
    this.expected_time = expected_time;
    this.difficulty = difficulty;
    this.start_point_type = start_point_type
    this.start_point_id = start_point_id;
    this.end_point_type = end_point_type;
    this.end_point_id = end_point_id;
    this.reference_points = reference_points;
}

const createHike = async (hike) => {
    let response = await fetch(URL + '/hikes', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(hike),
    });

    let err = new Error();
    if (!response.ok) {
        if (response.status === 500) {
            err.message = "500 INTERNAL SERVER ERROR";
            throw err;
        }
        else if (response.status === 422) {
            err.message = "422 UNPROCESSABLE ENTITY";
            throw err;
        }
        else if (response.status === 401) {
            err.message = "422 UNAUTHORIZED";
            throw err;
        }
        else {
            err.message = "OTHER ERROR"
            throw err;
        }
    }
}

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


const API = { Hike, createHike, uploadFile };
export default API;