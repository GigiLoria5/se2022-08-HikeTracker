'use strict';

const express = require('express');
const UserDao = require('./dao/UserDAO.js');
const cors = require('cors');
const morgan = require('morgan');

/* Passport-related imports */
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

/* init express */
const app = new express();
app.use(morgan('dev'));
const port = 3001;
app.use(express.json());                                  //Serializes body into JSON objects 

/* Set up and enable cors */
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

/* Passport: set up local strategy */

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  },
  async function verify(email, password, cb) {
  const user = await UserDao.getUser(email, password);
  if (!user)
    return cb(null, false, 'Incorrect email or password.');

  return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {          // this user is id + email + name + score
  return cb(null, user);
  // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
});


app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

/* SESSION QUERY */
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
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


// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
