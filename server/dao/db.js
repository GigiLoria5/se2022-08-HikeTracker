'use strict';

/* DB access module */
const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('hiker_tracker_db.sqlite', (err) => {
    if (err) throw err;
});

//db.get("PRAGMA foreign_keys = ON"); // active foreign keys ???

module.exports = db;