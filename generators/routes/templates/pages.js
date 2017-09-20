'use strict';
var express = require('express');
var router = express.Router();
var cfg = require('../config');

// Pilot Search
router.get('/pilot-search', function(req, res) {
    res.render('pages/pilot-search', { 
        prototypeTitle : 'Pilot Search',
        config: cfg 
    });
});

// Community Search
router.get('/community-search', function(req, res) {
    res.render('pages/community-search', { 
        prototypeTitle : 'Community Search',
        config: cfg 
    });
});

// SFDC Agent Box
router.get('/agent-box', function(req, res) {
    res.render('pages/agent-box', { 
        prototypeTitle : 'Agent Insight Panel',
        config: cfg
    });
});

// SFDC Agent Full
router.get('/agent-full-search', function(req, res) {
    res.render('pages/agent-full-search', { 
        prototypeTitle : 'Agent Full Search',
        config: cfg
    });
});

module.exports = router;