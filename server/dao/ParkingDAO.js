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

exports.getAllParkingLots = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM parking_lot`;
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(err);
            else {
                const parking = rows.map((row => ({
                    id: row.id,
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

exports.checkExisting = (parking) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM parking_lot WHERE (coordinates = ? OR (city = ? AND province = ? AND country = ? AND address = ?))';
        db.get(sql, [parking.coordinates, parking.city, parking.province, parking.address], (err, row) => {
            if (err) {
                reject(err);
            } else if (row === undefined) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};

exports.addParking = (parking, user_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO parking_lot(city, province, country, address, coordinates, user_id) VALUES(?, ?, ?, ?, ?, ?)';
        db.get(sql, [parking.city, parking.province, parking.country, parking.address, parking.coordinates, user_id], function (err, row) {
            if(err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
};

exports.deleteParking = (id, user_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM parking_lot WHERE id = ? AND user_id = ?';
        db.run(sql, [id, user_id], function (err) {
            if(err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};

exports.deleteParkingByAddress = (address, user_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM parking_lot WHERE address = ? AND user_id = ?';
        db.run(sql, [address, user_id], function (err) {
            if(err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};