'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_PREFIX: '"/api/v1.0"',
  DEFAULT_CSRF_TOKEN: '"BtpRTscUQ3fLtbHAh2kRmLeEMte52zoJn69H6vN1"',
  LOGIN_URL: '"http://scratch-dev.lintol.io/login"'
})
