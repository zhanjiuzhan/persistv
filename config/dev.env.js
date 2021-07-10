'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://42.192.230.53:9093/"'
  // BASE_API: '"http://192.168.0.104:9093/"'
})
