'use strict';

const express = require('express');
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials : true
}
// init express
const app = new express(); 
const PORT = 3001;
app.use(cors(corsOptions));
///////////////*API*//////////////////
// declare routes

const hikeRoute = require('./routes/Hike.js');

// apply routes
app.use('/api', hikeRoute);

// Activate the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
module.exports = app;