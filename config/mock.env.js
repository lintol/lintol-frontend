'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"mock"',
  API_PREFIX: '"http://localhost:3004"'
})
