'use strict';

const express = require('express');
const UserDao = require('./dao/UserDAO');
const cors = require('cors');
const morgan = require('morgan');
const nodemailer = require('./config/nodemailer.config');
const crypto = require('crypto');


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

passport.use(new LocalStrategy(
  async function verify(username, password, cb) {
  const user = await UserDao.getUser(username, password);
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
}));
app.use(passport.authenticate('session'));

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

app.post('/api/users', async (req,res) =>{
  try {
    // Check if the user email already exists
    const exists= await UserDao.getUserByEmail(req.body.email);
    if(exists===false){
      const token = crypto.randomBytes(16).toString('hex'); 
      await UserDao.addUser(req.body,token); //Create a new user in the DB having email_verified=0, returns the personal tokenc reated for the user 
      const link = 'http://localhost:3001/api/users/confirm/'+token;
      nodemailer.sendConfirmationEmail(req.body.email,req.body.email,link);

      return res.status(201).end();
    }else{
      return res.status(422).json({ error: "Email already exists" });
    }

  } catch (err) {
    console.log(err);
    return res.status(503).json({ error: err });
  }
});

// Confirmation route 
app.get("/api/users/confirm/:token", async (req,res)=>{
  try{
    const token = req.params.token; // Get token from params
    if(token!==undefined){ // Checks if the token exists

     const value = await UserDao.islegit(token); //Checks if is legit to update the status of the given token
     if(value===true){
      const result = await UserDao.activate(token); //Updates the user account
      return res.status(200).json(result);

     }else{
      return res.status(404).json({ error: err });
     }

    }else{
      return res.status(422).json({ error: "Missing token" });
    }
  }catch (err) {
    console.log(err);
    return res.status(503).json({ error: err });
  }
});


// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
