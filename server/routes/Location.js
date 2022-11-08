'use strict';

// import packages and classes
const express = require('express');
const { check, validationResult } = require('express-validator'); // validation middleware
//const { errorFormatter, isLoggedIn } = require('../utils/utils');
const locationDao = require('../dao/LocationDAO');

const router = express.Router();

/////////////////////////////////////////////////////////////////////
//////                          GET                            //////
/////////////////////////////////////////////////////////////////////

// /api/location/:id
// Return hut by an id
router.get('/location/:id', 
    check('id').exists(),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        locationDao.getLocationById(req.params.id)
            .then((hut) => res.status(200).json(hut))
            .catch(() => res.status(501).json({ error: `Database error while retrieving the location` }));
});

module.exports = router;