'use strict';

/* Data Access Object (DAO) module for managing activities */

const db = require("./db");

exports.addActivity = (hike_id, user_id, start_time) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO activity(hike_id,user_id,start_time,end_time,duration) VALUES(?, ?, ?)';
        db.run(sql, [hike_id, user_id, start_time], function(err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

exports.getActiveActivityByHikeId = (hike_id, user_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM activity WHERE hike_id = ? AND user_id = ? AND end_time IS NULL';
        db.get(sql, [hike_id, user_id], (err, row) => {
            if (err) { reject(err); }
            else if (row === undefined) {
                resolve(false);
            }
            else {
                resolve(row);
            }
        });
    });
};

exports.stopActivity = (hike_id, user_id, end_time, duration) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE activity SET end_time = ? and duration = ? WHERE hike_id=? and user_id=?';
        db.run(sql, [end_time,duration,hike_id, user_id], (err) => {
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
        const sql = `SELECT * FROM activity a INNER JOIN hike h WHERE a.hike_id = h.id AND a.user_id = ? `;
        db.all(sql, [user_id], (err, rows) => {
            if (err)
                reject(err);
            else {
                resolve(rows); // TO MODIFY
            }
        });
    });
};

exports.deleteActivity = (hike_id,user_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM activity WHERE id = ? AND user_id = ?';
        db.run(sql, [hike_id, user_id], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}