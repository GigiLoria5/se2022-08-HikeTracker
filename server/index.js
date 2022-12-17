'use strict';

const express = require('express');
const UserDao = require('./dao/UserDAO');
const cors = require('cors');
const morgan = require('morgan');
const fileupload = require("express-fileupload");
const { body, validationResult } = require('express-validator'); // validation middleware

/* Passport-related imports */
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const bodyParser = require('body-parser')

/* init express */
const app = new express();
const port = 3001;
app.use(morgan('dev'));
//app.use(express.json());                                  //Serializes body into JSON objects 

/* Set up and enable cors */
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost'],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json({limit: "15mb"}));
app.use(bodyParser.urlencoded({limit: "15mb", extended: true, parameterLimit:50000}));

/* Passport: set up local strategy */
/* Given username and password, checks if the user exists using the getUser function.
Then, checks if the account is active by means of checkActive function.  */
passport.use(new LocalStrategy(
    async function verify(username, password, cb) {
        const user = await UserDao.getUser(username, password);
        if (!user) {
            return cb(null, false, { error: 'Incorrect email or password' });
        }
        else {
            const active = await UserDao.checkActive(username);
            if (active === true) {
                return cb(null, user);
            } else {
                return cb(null, false, { error: 'Pending activation, please validate your account' });
            }
        }
    }));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (user, cb) {          // this user is id + email + name + score
    return cb(null, user);
    // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
});


const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ error: 'Not authorized' });
}

app.use(session({
    secret: "shhhhh... it's a secret!",
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'strict', // Remove SameSite Warning
    }
}));
app.use(passport.authenticate('session'));


/////////////////////*API*////////////////////////
///////////////*declare routes*//////////////////
const userRoute = require('./routes/User.js');
const hikeRoute = require('./routes/Hike.js');
const hutRoute = require('./routes/Hut.js');
const parkingRoute = require('./routes/Parking.js');
app.use(fileupload());


//////*About the login and logout*////////
app.post('/api/sessions', [
    body('password').notEmpty().isString(),
    body('username').isEmail()
], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: "Fields validation failed! Check email and password" });
    }
    passport.authenticate('local', (err, user, info) => {

        if (err)
            return next(err);
        if (!user) {
            // display wrong login messages (wrong credentials, pending account)
            return res.status(401).json(info);
        }
        // success, perform the login
        req.login(user, (err) => {
            if (err)
                return next(err);

            // req.user contains the authenticated user, we send all the user info back
            // this is coming from managerDao.getManager()
            return res.json(req.user);
        });
    })(req, res, next);
});

// GET /api/sessions/current
app.get('/api/sessions/current', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    }
    else
        res.status(401).json({ error: 'Not authenticated' });
});

// DELETE /api/session/current
app.delete('/api/sessions/current', (req, res) => {
    req.logout(() => {
        res.end();
    });
});

////////////////////*API*///////////////////////
///////////////*apply routes*//////////////////
app.use('/api', hikeRoute);
app.use('/api', userRoute);
app.use('/api', hutRoute);
app.use('/api', parkingRoute);


// activate the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;