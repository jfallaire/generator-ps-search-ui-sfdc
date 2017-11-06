'use strict';
var express = require('express');
var router = express.Router();
var auth = require('../auth');
var cfg = require('../config');

router.get('/', auth.generateSearchToken, function(req, res) {
    console.log('entering landing page!!!');
    console.log(req.user);
    console.log(req.session.token);
    console.log(req.session.filter);
    
    res.redirect('/pilot-search');
});

// Full Search
router.get('/full-search', function(req, res) {
    res.render('pages/full-search', { 
        prototypeTitle : 'Full Search Test',
        config: cfg 
    });
});

// Pilot Search
router.get('/pilot-search', auth.generateSearchToken, function(req, res) {
    console.log('entering pilot search!!!');
    console.log(req.user);
    console.log(req.session.token);
    console.log(req.session.filter);

    res.render('pages/pilot-search', { 
        prototypeTitle : 'Pilot Search',
        config: cfg,
        userInfos: req.user,
        token: req.session.token
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