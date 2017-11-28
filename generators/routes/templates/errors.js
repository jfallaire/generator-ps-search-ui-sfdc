'use strict';
var express = require('express');
var router = express.Router();
var cfg = require('../config');

// Error handling routes
router.get('/403', (req, res) =>  {
    res.send('403 forbidden');
});

router.get('/401', (req, res) =>  {
    res.send('401 unauthorized');
});

// add other custom error route below ex: 401, 404, etc..

module.exports = router;