'use strict';
/* Data Access Object (DAO) module for accessing users */

const crypto = require('crypto');
const { resolve } = require('path');
const db = require('./db'); // open the database
const User = require('../models/User.js');

exports.getUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM user WHERE email = ?';
        db.get(sql, [email], (err, row) => {
            if (err) { reject(err); }
            else if (row === undefined) { resolve(false); }
            else {
                const user = new User({
                    id:row.id,
                    name:row.name,
                    surname:row.surname,
                    email:row.email,
                    password:"",
                    salt:"",
                    email_verified:row.email_verified,
                    phone_number:row.phone_number,
                    role:row.role,
                    token:row.token
                });
                const salt = row.salt;
                const hashedPassword = crypto.createHash('sha256')
                    .update(password, "utf8")
                    .update(makeHash(salt))
                    .digest("base64");
                resolve(hashedPassword === row.password ? user : false);
            }
        });
    });
};

exports.checkActive = (email) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM user WHERE email = ? AND email_verified = 1';
        db.get(sql, [email], (err, row) => {
            if (err) { reject(err); }
            else
                if (row === undefined) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
        });
    });
}

exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM user';
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows.map((row) =>
                    new User({
                        id:row.id,
                        name:row.name,
                        surname:row.surname,
                        email:row.email,
                        password:row.password,
                        salt:row.salt,
                        email_verified:row.email_verified,
                        phone_number:row.phone_number,
                        role:row.role,
                        token:row.token
                    })
                ));
            }
        });
    });
}

exports.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM user WHERE id = ?`;
        db.run(sql, [id], function (err) {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
}


exports.getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM user WHERE id = ?`;
        db.get(sql, [userId], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve(null); // user not found
            else {
                const user = new User({
                    id:row.id,
                    name:row.name,
                    surname:row.surname,
                    email:row.email,
                    password:row.password,
                    salt:row.salt,
                    email_verified:row.email_verified,
                    phone_number:row.phone_number,
                    role:row.role,
                    token:row.token
                });
                resolve(user);
            }
        });
    });
};

exports.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM user WHERE email = ?`;
        db.get(sql, [email], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve(false); // user not found
            else {
                const user = new User({
                    id:row.id,
                    name:row.name,
                    surname:row.surname,
                    email:row.email,
                    password:row.password,
                    salt:row.salt,
                    email_verified:row.email_verified,
                    phone_number:row.phone_number,
                    role:row.role,
                    token:row.token
                });
                resolve(user);
            }
        });
    });
};

/*  Creates a new user inside the database  */
exports.addUser = (body, token) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = crypto.createHash('sha256')
        .update(body.password, "utf8")
        .update(makeHash(salt))
        .digest("base64");

    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO user (name,surname,email,password,salt,email_verified,phone_number,role,token) VALUES(?,?,?,?,?,?,?,?,?)';
        db.run(sql, [body.name, body.surname, body.email, hashedPassword.toString('hex'), salt, 0, body.phone_number, body.role, token], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

/* Activate the user given its token received by email */
exports.islegit = (token) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM user WHERE token = ? AND email_verified=0';
        db.get(sql, [token], (err, row) => {
            if (err) {
                reject(err);
            }
            else if (row === undefined) {
                resolve({ error: 'Wrong token or account already verified' });
            }
            else {
                resolve(true);
            }
        });
    });
}

exports.activate = (token) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE user SET email_verified = 1 WHERE token=?';
        db.run(sql, [token], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

function makeHash(val) {
    return crypto.createHash('sha256').update(val, "utf8").digest();
}