import { APIURL } from './APIUrl';
import { Activity } from '../Utils/Activity';

/* Credentials required  */
/**
 *
 * Creates a new activity given hike_id, start_time and user credentials
 * 
 * @param activity contains: hike_id, start_time 
 */
async function addActivity(activity){
    const url = APIURL + '/api/activity';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(activity),
        });
        if (response.ok) {
            return true;
        } else {
            const errDetails = await response.text();
            throw errDetails;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 *
 * Return the list of all completed activies for a given user by its credentials
 * 
 */
async function getCompletedActivities(){
    const url = APIURL + '/api/activities/completed';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        if (response.ok) {
            const res = await response.json();
            return res.map((a) => ({ 
                    id: a.id,
                    title: a.title,
                    peak_altitude: a.peak_altitude,
                    city: a.city,
                    province: a.province,
                    country: a.country,
                    description: a.description,
                    ascent: a.ascent,
                    track_length: a.track_length,
                    expected_time: a.expected_time,
                    difficulty: a.difficulty,
                    gps_track: a.gps_track,
                    start_point_type: a.start_point_type,
                    start_point_id: a.start_point_id,
                    end_point_type: a.end_point_type,
                    end_point_id: a.end_point_id,
                    author_id: a.author_id,
                    picture: a.picture,
                    start_time: a.start_time,
                    end_time: a.end_time,
                    duration: a.duration,
                    date: new Date(a.start_time).toDateString()
            }));


        } else {
            const errDetails = await response.text();
            throw errDetails;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 *
 * Returns an activity (id, hike_id, user_id, start_time, end_time, duration) if the user is actually running an activity or an empty object instead.
 * 
 */
async function getRunningActivity() {
    const url = APIURL + '/api/activity/running';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        if (response.ok) {
            const res = await response.json();
            if (res.id !== undefined){
                return new Activity({
                    id: res.id,
                    hike_id: res.hike_id,
                    title: res.title,
                    user_id: res.user_id,
                    start_time: res.start_time,
                    end_time: res.end_time,
                    duration: res.duration
                });
            }else{
                return false;
            }
            

        } else {
            const errDetails = await response.text();
            throw errDetails;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }

}

/**
 *
 * Terminates the actual started activity for the given user, specifing the end_time
 * 
 * @param activity contains: end_time 
 */
async function terminateActivity(activity){
    const url = APIURL + '/api/activity/terminate';
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(activity),
        });
        if (response.ok) {
            return true;
        } else {
            const errDetails = await response.text();
            throw errDetails;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 *
 * Deletes the actual running activity for the given user 
 * 
 */
async function deleteActivity() {
    const url = APIURL + '/api/activity/running';
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


export {addActivity, getRunningActivity, terminateActivity, deleteActivity, getCompletedActivities}