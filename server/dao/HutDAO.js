'use strict';

/* Data Access Object (DAO) module for managing hut */

const db = require("./db");

exports.getCountries = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT DISTINCT country FROM hut ORDER BY country`;
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(err);
            else {
                const countries = rows.map((row => ({
                    country: row.country
                })));
                resolve(countries);
            }
        });
    });
};

exports.getProvincesByCountry = (country) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT DISTINCT province FROM hut WHERE country = ? ORDER BY province`;
        db.all(sql, [country], (err, rows) => {
            if (err)
                reject(err);
            else {
                const provinces = rows.map((row => ({
                    province: row.province
                })));
                resolve(provinces);
            }
        });
    });
};

exports.getCitiesByProvince = (province) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT DISTINCT city FROM hut WHERE province = ? ORDER BY city`;
        db.all(sql, [province], (err, rows) => {
            if (err)
                reject(err);
            else {
                const cities = rows.map((row => ({
                    city: row.city
                })));
                resolve(cities);
            }
        });
    });
};

exports.getHutById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT hut.id as hid, hut.name as hname, city, province, country, address, hut.phone_number as hphone_number, altitude, description, beds_number, opening_period, coordinates, hut.email as hemail, website, type, user_id, user.name as uname, surname, picture  FROM hut, user WHERE user_id=user.id AND hid = ?`;
        db.all(sql, [id], (err, rows) => {
            if (err)
                reject(err);
            else {
                const hut = rows.map((row => ({
                    id: parseInt(id),
                    name: row.hname,
                    city: row.city,
                    province: row.province,
                    country: row.country,
                    address: row.address,
                    phone_number: row.hphone_number,
                    altitude: row.altitude,
                    description: row.description,
                    beds_number: row.beds_number,
                    opening_period: row.opening_period,
                    coordinates: row.coordinates,
                    email: row.hemail,
                    website: row.website,
                    type: row.type,
                    author_id: row.user_id,
                    author: row.uname + " " + row.surname,
                    picture: row.picture
                })));
                resolve(hut[0]);
            }
        });
    });
};

exports.getHutByName = (name) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT hut.id as hid, hut.name as hname, city, province, country, address, hut.phone_number as hphone_number, altitude, description, beds_number, opening_period, coordinates, hut.email as hemail, website, type, user_id, user.name as uname, surname, picture  FROM hut, user WHERE user_id=user.id AND hut.name = ?`;
        db.all(sql, [name], (err, rows) => {
            if (err)
                reject(err);
            else {
                const hut = rows.map((row => ({
                    id: row.hid,
                    name: row.hname,
                    city: row.city,
                    province: row.province,
                    country: row.country,
                    address: row.address,
                    phone_number: row.hphone_number,
                    altitude: row.altitude,
                    description: row.description,
                    beds_number: row.beds_number,
                    opening_period: row.opening_period,
                    coordinates: row.coordinates,
                    email: row.hemail,
                    website: row.website,
                    type: row.type,
                    author_id: row.user_id,
                    author: row.uname + " " + row.surname,
                    picture: row.picture
                })));
                resolve(hut[0]);
            }
        });
    });
};

exports.getAllHuts = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT hut.id as hid, hut.name as hname, city, province, country, address, hut.phone_number as hphone_number, altitude, description, beds_number, opening_period, coordinates, hut.email as hemail, website, type, user_id, user.name as uname, surname, picture  FROM hut, user WHERE user_id=user.id ORDER BY hid DESC`;
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(err);
            else {
                const huts = rows.map((row => ({
                    id: row.hid,
                    name: row.hname,
                    city: row.city,
                    province: row.province,
                    country: row.country,
                    address: row.address,
                    phone_number: row.hphone_number,
                    altitude: row.altitude,
                    description: row.description,
                    beds_number: row.beds_number,
                    opening_period: row.opening_period,
                    coordinates: row.coordinates,
                    email: row.hemail,
                    website: row.website,
                    type: row.type,
                    author_id: row.user_id,
                    author: row.uname + " " + row.surname,
                    picture: picture
                })));
                resolve(huts);
            }
        });
    });
};

exports.addHut = (userid, hut) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO hut(name,city,province,country,address,altitude,description,beds_number,opening_period,coordinates,phone_number,email,website,type,user_id, picture) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
        db.run(sql, [
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
            userid,
            hut.picture
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
        const sql = 'SELECT * FROM hut WHERE coordinates = ?';
        db.get(sql, [hut.coordinates], (err, row) => {
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

exports.getAllHuts = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT hut.id as hid, hut.name as hname, city, province, country, address, hut.phone_number as hphone_number, altitude, description, beds_number, opening_period, coordinates, hut.email as hemail, website, type, user_id, user.name as uname, surname, picture  FROM hut, user WHERE user_id=user.id ORDER BY hid DESC`;
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(err);
            else {
                const huts = rows.map((row => ({
                    id: row.hid,
                    name: row.hname,
                    city: row.city,
                    province: row.province,
                    country: row.country,
                    address: row.address,
                    phone_number: row.hphone_number,
                    altitude: row.altitude,
                    description: row.description,
                    beds_number: row.beds_number,
                    opening_period: row.opening_period,
                    coordinates: row.coordinates,
                    email: row.hemail,
                    website: row.website,
                    type: row.type,
                    author_id: row.user_id,
                    author: row.uname + " " + row.surname,
                    picture: row.picture
                })));
                resolve(huts);
            }
        });
    });
};