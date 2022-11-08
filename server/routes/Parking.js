'use strict';

// import packages and classes
const express = require('express');
const { check, validationResult } = require('express-validator'); // validation middleware
//const { errorFormatter, isLoggedIn } = require('../utils/utils');
const parkingDao = require('../dao/ParkingDAO');

const router = express.Router();

/////////////////////////////////////////////////////////////////////
//////                          GET                            //////
/////////////////////////////////////////////////////////////////////

// /api/parking/:id
// Return parking by an id
router.get('/parking/:id', 
    check('id').exists(),

    async (req, res) => {

        parkingDao.getParkingLotById(req.params.id)
            .then((hut) => res.status(200).json(hut))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hut` }));
});

module.exports = router;