'use strict';
/* Data Access Object (DAO) module for accessing users */

const crypto = require('crypto');
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
                    name:row.name, 
                    surname:row.surname, 
                    email:row.email, 
                    email_verified: row.email_verified, 
                    phone_number: row.phone_number, 
                    role:row.role, 
                    token:row.token };
                const salt = row.salt;
                crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
                    if (err) reject(err);

                    const passwordHex = Buffer.from(row.password, 'hex');

                    if(!crypto.timingSafeEqual(passwordHex, hashedPassword))
                    resolve(false);
                    else resolve(user); 
                });
            }
        });
    });
};


exports.getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM user WHERE id = ?`;
        db.get(sql, [userId], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve(null); // user not found
            else {
                const user = {id: row.id, name:row.name, surname:row.surname, email:row.email, password:row.password, salt:row.salt, email_verified: row.email_verified, phone_number: row.phone_number, role:row.role, token:row.token };
                resolve(user);
            }
        });
    });
};
