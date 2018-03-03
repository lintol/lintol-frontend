'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"mock"',
  API_PREFIX: '"http://localhost:16006/rest"',
  DEFAULT_CSRF_TOKEN: '"3Eaa3Op9y0f4vGdwrvoFmSpbwFD5uHQuTTPgdHlM"',
  LOGIN_URL: '"http://scratch-dev.lintol.io/login"'
})
