'use strict';
var _ = require('underscore')
/**
 * Module dependencies.
 */
const coveoPlatformApi = require('./utils/cloudplatformAPI');

const middleware = {

    ensureTokenGenerated : (req, res, next) => {
        console.log('ensureTokenGenerated >>> ' + req.originalUrl);
        console.log('filter >>> ' + req.filter);
        console.log('searchHub >>> ' + req.searchHub);
        if(req.session && req.session.tokens && req.session.tokens[req.originalUrl]) {
            console.log('We already have a token stored in session...');
            next();
        } else {
            req.session.tokens = req.session.tokens || {};
            let users = [];
            if(req.user) {
                users = req.user.nameID ? [req.user.nameID] : users;
                users = users.concat(_.map(req.user.emails, (email) => email.value ));
            }
            users = users.length == 0 ? ['platform@coveo.com'] : users;
            
            coveoPlatformApi.getSearchToken(users, (req.filter || ''), (req.searchHub || ''))
                .then((data) => {
                    const json = JSON.parse(data);
                    console.log('token=', json.token);
                    req.session.tokens[req.originalUrl] = json.token;
                    next();
                })
                .catch((err) => {
                    next(err);
                });
        }
    },
    errorHandling : (err, req, res, next) => {
        console.error(err);
        res.status(err.statusCode || err.status || 500).send(err);
    },
    resetToken : (req, res, next) => {
        req.session.tokens = {};
        next();
    }
};

exports = module.exports = middleware;