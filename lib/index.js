'use strict'

const inquirer = require('inquirer')
const { confirmProject, reInputProject, optionArgs } = require('./questions')
const co = require('co')
const download = require('./download')
const { Colors, Resp, TemplatePath, Tips } = require('./config')
const fs = require('fs')
const childProcess = require('child_process')
const Ora = require('ora')
const shell = require('shelljs')

const _ask = Symbol('ask')
const _projectName = Symbol('projectName')
const _download = Symbol('download')
const _cwd = Symbol('cwd')
const _generate = Symbol('generate')
const _init = Symbol('init')

class Zeus {
  constructor (argv) {
    this[_projectName] = argv.projectName
    this[_cwd] = process.cwd()
  }

  [_ask] () {
    return co(function * () {
      let ans = yield inquirer.prompt(confirmProject(this[_projectName]))
      if (!ans.projectName) {
        this[_projectName] = yield inquirer.prompt(reInputProject())
      }
      let opt = yield inquirer.prompt(optionArgs())
      return Promise.resolve(Object.assign(opt, { projectName: this[_projectName] }))
    }.bind(this))
  }

  [_download] () {
    return download(Resp.normal)
  }

  [_init] () {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(TemplatePath)) {
        shell.rm('-rf', `./${TemplatePath}`)
      }
      return resolve()
    })
  }

  [_generate] (answers) {
    let destProjectPath = `${this[_cwd]}/${answers.projectName}`
    return new Promise((resolve, reject) => {
      const spinner = new Ora({
        text: Tips.genTemplate,
        color: Colors.b,
        spinner: process.argv[2]
      }).start()
      childProcess.exec(`mv ${TemplatePath} ${destProjectPath}`, (err, stdout, stderr) => {
        if (err) {
          return reject(err)
        }
        spinner.text = Tips.genTemplateSucc
        spinner.succeed()
        return resolve()
      })
    })
  }

  start () {
    co(function * () {
      yield this[_init]()
      yield this[_download]()
      let answers = yield this[_ask]()
      yield this[_generate](answers)
    }.bind(this))
  }
}

module.exports = Zeus
