#!/usr/bin/env node
'use strict'
const Gy = require('../lib')

const { argv } = require('yargs')
  .command({
    command: 'init [project-name]',
    aliases: ['i'],
    builder: yargs => yargs.default('projectName', 'gy-project'),
    desc: 'generate a new project with gy'
  })
  .example('$0 init gy-project', 'init the gy project')
  .demandCommand(1, 'You need to type the operation')
  .usage('Usage: gy <command> [args]')
  .help('h', 'looking for help')
  .alias('help', 'h')
  .epilog('copyright 2017 NETEASE, lgybetter')

new Gy(argv).start()
