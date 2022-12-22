'use strict';

// import packages and classes
const express = require('express');
const Activity = require('../models/Activity');
const { body, check, query, validationResult } = require('express-validator'); // validation middleware
const ActivityDAO = require('../dao/ActivityDAO');
const UserDAO = require('../dao/UserDAO');
const router = express.Router();




module.exports = router;
