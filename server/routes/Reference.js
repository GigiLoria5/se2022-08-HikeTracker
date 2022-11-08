'use strict';

// import packages and classes
const express = require('express');
const { check, validationResult } = require('express-validator'); // validation middleware
//const { errorFormatter, isLoggedIn } = require('../utils/utils');
const referenceDao = require('../dao/ReferenceDAO');

const router = express.Router();

/////////////////////////////////////////////////////////////////////
//////                          GET                            //////
/////////////////////////////////////////////////////////////////////

// /api/location/:id
// Return reference points Id and type by an hike id
router.get('/reference/:id', 
    check('id').exists(),

    async (req, res) => {

        referenceDao.getReferenceByHikeId(req.params.id)
            .then((references) => res.status(200).json(references))
            .catch(() => res.status(500).json({ error: `Database error while retrieving some reference points` }));
});

module.exports = router;