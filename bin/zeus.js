#!/usr/bin/env node
'use strict';
const https = require('https')
const fs = require('fs')
const cp = require('child_process')
const rm = require('rimraf').sync
const ora = require('ora')

const download = (url, dest, cb)  => {
  const file = fs.createWriteStream(dest);
  const request = https.get(url, res => {
    res.pipe(file);
    file.on('finish', () => {
      console.log('download finish')
      file.close(cb);
    });
  });
}

const glone = (resp, dest='template') => {
  const spinner = new Ora({
    text: 'download template',
    spinner: process.argv[2]
  }).start()
  spinner.color = 'yellow';
	spinner.text = 'download template';
  cp.exec(`git clone ${resp} ${dest}`, (err, stdout, stderr) => {
    if(err) {
      console.log(err)
    }
    spinner.succeed();
    rm(`${dest}/.git`)
  })
}

glone('https://github.com/lgybetter/gyblog-admin.git')