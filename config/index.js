var env = process.env.COVEO_ENV || 'development'
  , config = require('./config.' + env);

module.exports = config;