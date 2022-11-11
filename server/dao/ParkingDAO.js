'use strict';

/* Data Access Object (DAO) module for managing parking */

const db = require("./db");

exports.getParkingLotById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM parking_lot WHERE id = ?`;
        db.all(sql, [id], (err, rows) => {
            if (err)
                reject(err);
            else {
                const parking = rows.map((row => ({
                    id: id,
                    city: row.city,
                    province: row.province,
                    country: row.country,
                    address: row.address,
                })));
                resolve(parking);
            }
        });
    });
};