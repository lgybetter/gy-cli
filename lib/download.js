'use strict'

const childProcess = require('child_process')
const Ora = require('ora')
const { Colors, Tips, TemplatePath } = require('./config')
const shell = require('shelljs')

const download = (resp, dest = TemplatePath) => {
  return new Promise((resolve, reject) => {
    const spinner = new Ora({
      text: Tips.downloading,
      color: Colors.b,
      spinner: process.argv[2]
    }).start()
    childProcess.exec(`git clone ${resp} ${dest}`, (err, stdout, stderr) => {
      if (err) {
        return reject(err)
      }
      spinner.text = Tips.downloadSuccess
      spinner.succeed()
      shell.rm('-rf', `${dest}/.git`)
      return resolve()
    })
  })
}

module.exports = download
