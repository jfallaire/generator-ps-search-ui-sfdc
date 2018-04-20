var config = require('./config.global');

config.env = 'production';

//Coveo
config.coveo.env = 'production';
config.coveo.api_key = '';
config.coveo.superUser_api_key = '';
config.coveo.org_id = '';
config.coveo.searchHub = {
  'default_searchHub': 'pilot',
  '/pilot-search': 'pilot',
  '/full-search': 'pilot'
};
config.coveo.filter = {
  "default_filter": process.env.FILTER_EXPRESSION || ''
};

module.exports = config;