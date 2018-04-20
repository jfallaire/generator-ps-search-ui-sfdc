'use strict';
var cfg = require('../config');

module.exports = {
    getUserIdentities: (req, auth_type) => {

        let users = [];
        const impersonate_user = process.env.IMPERSONATE_USER || '';
        const additional_user = process.env.ADDITIONAL_USER || '';
        if(req.user) {

            if(auth_type === 'azure') {
                users = [req.user.upn || req.user._json.email];
            } else if (auth_type === 'okta') {
                users = [req.session.passport.user]
            }
            
            if(cfg.enableImpersonateUser && impersonate_user) {
                console.log('using IMPERSONATE_USER environment variable >>> ' + impersonate_user);
                users = impersonate_user.split(';');
            } else if(additional_user) {
                console.log('using ADDITIONAL_USER environment variable >>> ' + impersonate_user);
                users.concat(additional_user);
            }
        }
        
        return users;


    }
}