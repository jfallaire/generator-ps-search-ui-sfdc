'use strict';
const config = require('./config');
const coveoPlatformApi = require('./utils/cloudplatformAPI');
const sessionUtils = require('./utils/sessionUtils');

function generateSearchToken(req, res, next) {
  req.user = {};
  req.session = {};
  let configCoveoFilter = config.coveo.filter[req.originalUrl] || config.coveo.filter.default_filter || '';
  let searchHub = config.coveo.searchHub[req.originalUrl] || config.coveo.searchHub.default_searchHub || 'pilot';

  config.coveo.searchHubAnalytics = searchHub;

  if (req.session && req.session.token && req.session.filter == configCoveoFilter) {
    console.log('We already have a token stored in session and filter is valid for current search interface');
    return next();
  } else {
    console.log('User is authenticated and we need to request a new search token...');
    let users = sessionUtils.getUserIdentities(req, 'azure');
    coveoPlatformApi.getSearchToken(users, req.session.filter = configCoveoFilter, searchHub)
      .then((data) => {
        const json = JSON.parse(data);
        console.log('token=', json.token);
        req.session.token = json.token;
        return next();
      })
      .catch((err) => {
        console.error(err);
        res.send('Error: unable to generate a valid Search token with the following users >>> ' + JSON.stringify(users));
      });
  }
}

module.exports = {
  generateSearchToken: generateSearchToken
};
