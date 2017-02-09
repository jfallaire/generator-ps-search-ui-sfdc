var env = process.env.NODE_ENV || 'development'
  , config = require('./config.' + env);

module.exports = config;