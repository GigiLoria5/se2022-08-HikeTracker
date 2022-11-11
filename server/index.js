'use strict';

const express = require('express');
const fileupload = require("express-fileupload");
const cors = require('cors');

// init express
const app = new express(); 
const PORT = 3001;

/* Set up and enable cors */
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };
  app.use(cors(corsOptions));

///////////////*API*//////////////////
// declare routes

const hikeRoute = require('./routes/Hike.js');
app.use(fileupload());
// apply routes
app.use('/api', hikeRoute);

// Activate the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
module.exports = app;