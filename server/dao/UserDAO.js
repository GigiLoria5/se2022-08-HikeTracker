'use strict';
/* Data Access Object (DAO) module for accessing users */

const crypto = require('crypto');
const { resolve } = require('path');
const db = require('./db'); // open the database


exports.getUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM user WHERE email = ?';
        db.get(sql, [email], (err, row) => {
            if (err) { reject(err); }
            else if (row === undefined) { resolve(false); }
            else {
                const user = {
                    id: row.id,
                    name: row.name,
                    surname: row.surname,
                    email: row.email,
                    email_verified: row.email_verified,
                    phone_number: row.phone_number,
                    role: row.role,
                    token: row.token
                };
                const salt = row.salt;
                crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
                    if (err) reject(err);

                    const passwordHex = Buffer.from(row.password, 'hex');
                    if (!crypto.timingSafeEqual(passwordHex, hashedPassword))
                        resolve(false);
                    else resolve(user);
                });
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


exports.getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM user WHERE id = ?`;
        db.get(sql, [userId], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve(null); // user not found
            else {
                const user = { id: row.id, name: row.name, surname: row.surname, email: row.email, password: row.password, salt: row.salt, email_verified: row.email_verified, phone_number: row.phone_number, role: row.role, token: row.token };
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
                const user = { id: row.id, name: row.name, surname: row.surname, email: row.email, password: row.password, salt: row.salt, email_verified: row.email_verified, phone_number: row.phone_number, role: row.role, token: row.token };
                resolve(user);
            }
        });
    });
};

/*  Creates a new user inside the database  */
exports.addUser = (body, token) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.scrypt(body.password, salt, 32, (err, hashedPassword) => {
        if (err) reject(err);
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
