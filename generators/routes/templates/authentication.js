
'use strict';
var express = require('express');
var router = express.Router();
var passport = require('../passports');
var middleware = require('../middleware');


router.get('/renewToken', passport.protected, middleware.resetToken, middleware.ensureTokenGenerated, (req, res) => { 
    res.redirect('/'); 
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        res.redirect('/login'); //Inside a callback… bulletproof!
    });
})

router.get('/login', (req, res) => {
    res.render('pages/login');
})


router.get('/auth/okta', passport.authenticate('saml', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
    res.redirect(req.session.redirect_to || '/');
    delete req.session.redirect_to;
});

//POST Methods, redirect to home successful login
router.post('/auth/okta', passport.authenticate('saml', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
    // Successful authentication, redirect to redirect_to route or home.
    res.redirect(req.session.redirect_to || '/');
    delete req.session.redirect_to;
});


// Google aauthenticationuth routes
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//   // Successful authentication, redirect home.
//   res.redirect(req.session.redirect_to || '/');
//   delete req.session.redirect_to;
// });

// Facebook authentication routes
// router.get('/auth/facebook', passport.authenticate('facebook'));

// router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
//   // Successful authentication, redirect home.
//   res.redirect(req.session.redirect_to || '/');
//   delete req.session.redirect_to;
// });

module.exports = router;