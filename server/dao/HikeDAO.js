'use strict';

/* Data Access Object (DAO) module for managing hikes */

const db = require("./db");

exports.getCountries = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT DISTINCT country FROM hike ORDER BY country`;
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
        const sql = `SELECT DISTINCT province FROM hike WHERE country = ? ORDER BY province`;
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
        const sql = `SELECT DISTINCT city FROM hike WHERE province = ? ORDER BY city`;
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

exports.getHikeById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM hike WHERE id = ?`;
        db.all(sql, [id], (err, rows) => {
            if (err)
                reject(err);
            else {
                const hike = rows.map((row => ({
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
                    author_id: row.author_id
                })));
                resolve(hike[0]);
            }
        });
    });
}

exports.getAllHikes = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, title, peak_altitude, city, province, country, description, ascent, track_length, expected_time, difficulty, gps_track, start_point_type, start_point_id, end_point_type, end_point_id, author_id FROM hike ORDER BY id DESC`;
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(err);
            else {
                const hikes = rows.map((row => ({
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
                    author_id: row.author_id

                })));
                resolve(hikes);
            }
        });
    });
};

exports.addHike = (hike, author_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO hike(title, peak_altitude, city, province, country, description, ascent, track_length, expected_time, difficulty, gps_track, start_point_type, start_point_id, end_point_type, end_point_id, author_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id';
        db.get(sql, [
            hike.title,
            hike.peak_altitude,
            hike.city,
            hike.province,
            hike.country,
            hike.description,
            hike.ascent,
            hike.track_length,
            hike.expected_time,
            hike.difficulty,
            hike.gps_track,
            hike.start_point_type,
            hike.start_point_id,
            hike.end_point_type,
            hike.end_point_id,
            author_id
        ], function (err, row) {
            if (err) {
                reject(err);
                return;
            }
            resolve(row.id);
        });
    });
};

exports.addReferencePoint = (hikeID, referencePointType, referencePointId) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO reference_point(hike_id, ref_point_type, ref_point_id) VALUES(?, ?, ?)';
        db.run(sql, [
            hikeID,
            referencePointType,
            referencePointId
        ], function (err, row) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

exports.deleteHike = (hikeID) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM hike WHERE id = ?';
        db.run(sql, [hikeID], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

exports.deleteReferencePoints = (hikeID) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM reference_point WHERE hike_id = ?';
        db.run(sql, [hikeID], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}
