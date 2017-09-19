var config = require('./config.global');

config.env = 'production';

//Coveo
config.coveo.api_key = '';
config.coveo.org_id = '';
config.coveo.filter = {
  "default_filter": process.env.FILTER_EXPRESSION || ''
};

module.exports = config;