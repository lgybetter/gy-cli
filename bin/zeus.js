#!/usr/bin/env node
'use strict';
const https = require('https')
const fs = require('fs')

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

download('https://codeload.github.com/lgybetter/yargs-demo/zip/master', 'template.zip')
