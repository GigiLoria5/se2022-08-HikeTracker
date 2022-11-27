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

exports.addHut = (userid, hut) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO hut(name,city,province,country,address,altitude,description,beds_number,opening_period,coordinates,phone_number,email,website,type,user_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.get(sql, [
            hut.name,
            hut.city,
            hut.province,
            hut.country,
            hut.address,
            hut.altitude,
            hut.description,
            hut.beds_number,
            "",
            hut.coordinates,
            hut.phone_number,
            hut.email,
            hut.website,
            hut.type,
            userid
        ],  function(err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
}

exports.checkExisting = (hut) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM hut WHERE (coordinates = ? OR (city=? AND province=? AND country=? AND address=?))';
        db.run(sql, [hut.coordinates, hut.city, hut.province, hut.country, hut.address], (err, row) => {
            if (err) { reject(err); }
            else if (row === undefined) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
};

exports.deleteHut = (id, userid) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM hut WHERE id=? AND user_id=?';
        db.run(sql, [id, userid], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    })
}

exports.deleteHutByName = (name, userid) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM hut WHERE name=? AND user_id=?';
        db.run(sql, [name, userid], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    })
}