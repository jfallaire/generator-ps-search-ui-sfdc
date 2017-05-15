'use strict';
var express = require('express');
var router = express.Router();
var cfg = require('../config');

// Search page
router.get('/community-search', function(req, res) {
    res.render('pages/community-search', { 
        prototypeTitle : 'Community Search Prototype',
        config: cfg 
    });
});

router.get('/agent-box', function(req, res) {
    res.render('pages/agent-box', { 
        prototypeTitle : 'Agent Insight Panel',
        config: cfg
    });
});

router.get('/agent-full-search', function(req, res) {
    res.render('pages/agent-full-search', { 
        prototypeTitle : 'Agent Full Search',
        config: cfg
    });
});

module.exports = router;