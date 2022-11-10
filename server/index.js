'use strict';

const express = require('express');

// init express
const app = new express(); 
const PORT = 3001;

///////////////*API*//////////////////
// declare routes

const hikeRoute = require('./routes/Hike.js');

// apply routes
app.use('/api', hikeRoute);

// Activate the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
module.exports = app;