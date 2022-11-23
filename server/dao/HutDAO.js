'use strict';

/* Data Access Object (DAO) module for managing hut */

const db = require("./db");

exports.getHutById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM hut WHERE id = ?`;
        db.all(sql, [id], (err, rows) => {
            if (err)
                reject(err);
            else {
                const hut = rows.map((row => ({
                    id: id,
                    name: row.name,
                    city: row.city,
                    province: row.province,
                    country: row.country,
                    address: row.address,
                    phone_number: row.phone_number,
                    altitude: row.altitude,
                    description: row.description,
                    beds_number: row.beds_number,
                    opening_period: row.opening_period,
                    coordinates: row.coordinates
                })));
                resolve(hut[0]);
            }
        });
    });
};