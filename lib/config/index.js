'use strict'

const yaml = require('js-yaml')
const fs = require('fs')

const config = (path = './config.yml') => {
  try {
    return yaml.safeLoad(fs.readFileSync(`${__dirname}/config.yml`, 'utf8'))
  } catch (err) {
    return err
  }
}

module.exports = config()
