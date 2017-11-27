'use strict';
var _ = require('underscore')
/**
 * Module dependencies.
 */
const coveoPlatformApi = require('./utils/cloudplatformAPI');

const middleware = {

    ensureTokenGenerated : (req, res, next) => {
        
        if(req.session && req.session.tokens && req.session.tokens[req.originalUrl]) {
            console.log('We already have a token stored in session...');
            next();
        } else {
            req.session.tokens = req.session.tokens || {};
            // let users = ['platform@coveo.com'];
            let users = req.user.nameID ? [req.user.nameID] : [];
            users = users.concat(_.map(req.user.emails, (email) => email.value ));
            
            // creating filter expression based on current hostname.
            // let filter = req.baseUrl ? `@uri=\"${req.baseUrl.replace(/local\./, '')}\"` : '';
            let filter = '';
            
            coveoPlatformApi.getSearchToken(users, filter)
                .then((data) => {
                    const json = JSON.parse(data);
                    console.log('token=', json.token);
                    req.session.tokens[req.originalUrl] = json.token;
                    next();
                })
                .catch((err) => {
                    console.error(err);
                    res.send('Error: unable to generate a valid Search token with the following users >>> ' + JSON.stringify(users));
                });
        }
    },

    resetToken : (req, res, next) => {
        req.session.tokens = {};
        next();
    }
};

exports = module.exports = middleware;