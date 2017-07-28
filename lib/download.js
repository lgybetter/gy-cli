'use strict';

const child_process = require('child_process');
const ora = require('ora');
const { Colors, Tips, TemplatePath } = require('./config');

const download = (resp, dest=TemplatePath) => {
  return new Promise( (resolve, reject) => {
    const spinner = new ora({
      text: Tips.downloading,
      color: Colors.b,
      spinner: process.argv[2]
    }).start();
    child_process.exec(`git clone ${resp} ${dest}`, (err, stdout, stderr) => {
      if(err) {
        return reject(err)
      }
      spinner.text = Tips.downloadSuccess;
      spinner.succeed();
      rm('-rf', `${dest}/.git`);
      return resolve()
    });
  })
}

module.exports = download