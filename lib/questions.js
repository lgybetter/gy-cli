'use strict'

const fs = require('fs')
const { Questions } = require('./config')

const confirmProject = (projectName) => {
  return [
    {
      type: 'confirm',
      name: 'projectName',
      message: `${Questions.confirmProjectName}(${projectName})`,
      default: true
    }
  ]
}

const reInputProject = () => {
  return [
    {
      type: 'input',
      name: 'projectName',
      message: Questions.inputProjectName,
      validate: input => {
        if (/^[\d_-]/.test(input)) {
          return 'invalid first char'
        } else if (/[^\w-]/.test(input)) {
          return 'invalid char'
        } else if (!input) {
          return false
        } else if (fs.existsSync(input)) {
          return 'file existed'
        } else {
          return true
        }
      }
    }
  ]
}

const optionArgs = () => {
  const choices = [
    'none (configure it yourself)',
    'Standard (https://github.com/feross/standard)',
    'Airbnb (https://github.com/airbnb/javascript)'
  ]
  return [
    {
      type: 'list',
      name: 'Eslint',
      message: Questions.ifEslint,
      choices,
      filter: val => {
        return choices.indexOf(val)
      }
    },
    {
      type: 'confirm',
      name: 'Mocha',
      message: Questions.ifMocha,
      default: false
    }
  ]
}

module.exports = {
  confirmProject,
  reInputProject,
  optionArgs
}
