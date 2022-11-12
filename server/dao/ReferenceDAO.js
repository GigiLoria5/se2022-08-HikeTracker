'use strict';

/* Data Access Object (DAO) module for managing hikes */

const db = require("./db");

exports.getReferenceByHikeId = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM reference_point WHERE hike_id = ?`;
        db.all(sql, [id], (err, rows) => {
            if (err)
                reject(err);
            else {
                const references = rows.map((row => ({
                    hike_id: id,
                    ref_point_type: row.ref_point_type,
                    ref_point_id: row.ref_point_id
                })));
                resolve(references);
            }
        });
    });
};