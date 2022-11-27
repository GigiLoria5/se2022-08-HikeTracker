'use strict';

/* Data Access Object (DAO) module for managing location */

const db = require("./db");

exports.getLocationById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM location WHERE id = ?`;
        db.all(sql, [id], (err, rows) => {
            if (err)
                reject(err);
            else {
                const location = rows.map((row => ({
                    id: id,
                    value_type: row.value_type,
                    value: row.value,
                    description: row.description,
                })));
                resolve(location);
            }
        });
    });
};

exports.addLocation = (location) => {
    const coordinates = location.latitude+", "+location.longitude;
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO location (value_type, value, description, coordinates) VALUES (?,?,?,?) RETURNING id`;
        db.get(sql, [location.type, location.value, location.description, coordinates], function (err, row) { 
            if (err) {
                reject(err);
                return;
            }
            resolve(row.id);
        });
    });
};