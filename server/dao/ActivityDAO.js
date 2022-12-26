'use strict';

const Activity = require("../models/Activity");
/* Data Access Object (DAO) module for managing activities */

const db = require("./db");

exports.addActivity = (activity,user_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO activity(hike_id,user_id,start_time) VALUES(?, ?, ?)';
        db.run(sql, [activity.hike_id, user_id, activity.start_time], function(err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
};

exports.getRunningActivity = (user_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM activity WHERE user_id = ? AND end_time IS NULL';
        db.get(sql, [user_id], (err, row) => {
            if (err) { reject(err); }
            else if (row === undefined) {
                resolve(false);
            }
            else {
                const activity = new Activity({
                    id: row.id,
                    hike_id: row.hike_id,
                    user_id: row.user_id,
                    start_time: row.start_time,
                    end_time: row.end_time,
                    duration: row.duration
                })
                resolve(activity);
            }
        });
    });
};

exports.terminateActivity = (activity, user_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE activity SET end_time = ? , duration = ? WHERE user_id=? AND duration IS NULL';
        db.run(sql, [activity.end_time, activity.duration, user_id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

exports.getCompletedActivities = (user_id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM activity a INNER JOIN hike h WHERE a.hike_id = h.id AND a.user_id = ? AND a.end_time IS NOT NULL`;
        db.all(sql, [user_id], (err, rows) => {
            if (err)
                reject(err);
            else {
                const completed_hikes = rows.map((row => ({
                    id: row.id,
                    title: row.title,
                    peak_altitude: row.peak_altitude,
                    city: row.city,
                    province: row.province,
                    country: row.country,
                    description: row.description,
                    ascent: row.ascent,
                    track_length: row.track_length,
                    expected_time: row.expected_time,
                    difficulty: row.difficulty,
                    gps_track: row.gps_track,
                    start_point_type: row.start_point_type,
                    start_point_id: row.start_point_id,
                    end_point_type: row.end_point_type,
                    end_point_id: row.end_point_id,
                    author_id: row.author_id,
                    picture: row.picture,
                    start_time: row.start_time,
                    end_time: row.end_time,
                    duration: row.duration
                })));
                resolve(completed_hikes); 
            }
        });
    });
};

exports.deleteActivityByHikeId = (user_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM activity WHERE user_id = ? AND end_time IS NULL';
        db.run(sql, [user_id], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}