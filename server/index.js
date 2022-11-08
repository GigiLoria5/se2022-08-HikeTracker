'use strict';

const express = require('express');

// init express
const app = new express(); 
const PORT = 3001;

///////////////*API*//////////////////
// declare routes

const hikeRoute = require('./routes/Hike.js');
const hutRoute = require('./routes/Hut.js');
const locationRoute = require('./routes/Location.js');
const parkingRoute = require('./routes/Parking.js');
const referenceRoute = require('./routes/Reference.js');

// apply routes
app.use('/api', hikeRoute);
app.use('/api', hutRoute);
app.use('/api', locationRoute);
app.use('/api', parkingRoute);
app.use('/api', referenceRoute);

// Activate the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
module.exports = app;