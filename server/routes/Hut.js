'use strict';

// import packages and classes
const express = require('express');
const { check, validationResult } = require('express-validator'); // validation middleware
//const { errorFormatter, isLoggedIn } = require('../utils/utils');
const hutDao = require('../dao/HutDAO');

const router = express.Router();

/////////////////////////////////////////////////////////////////////
//////                          GET                            //////
/////////////////////////////////////////////////////////////////////

// /api/hut/:id
// Return hut by an id
router.get('/hut/:id', 
    check('id').exists(),

    async (req, res) => {

        hutDao.getHutById(req.params.id)
            .then((hut) => res.status(200).json(hut))
            .catch(() => res.status(500).json({ error: `Database error while retrieving the hut` }));
});

module.exports = router;