'use strict';
var express = require('express');
var router = express.Router();
var cfg = require('../config');
const passport = require('../passports');
const middleware = require('../middleware');

router.use((req, res, next)=>{
    req.filter = cfg.coveo.filter;
    next();    
});

router.get('/', (req, res) => {
    res.redirect('/agent-full-search');
});

// unprotected Full Search page
router.get('/full-search', (req, res) => {
    res.render('pages/full-search', { 
        prototypeTitle : 'Full Search Test',
        config: cfg 
    });
});

// Protected Search [Protected + generatedSearchToken]
router.get('/secured-search', passport.protected, middleware.ensureTokenGenerated, (req, res) => {

    res.render('pages/secured-search', { 
        prototypeTitle : 'Secured Search',
        config: cfg,
        token: req.session.tokens[req.originalUrl]
    });
});

// Playground sfdc Agent Box
router.get('/agent-box', (req, res) => {
    res.render('pages/agent-box', { 
        prototypeTitle : 'Agent Insight Panel',
        config: cfg
    });
});


module.exports = router;