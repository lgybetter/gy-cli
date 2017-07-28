#!/usr/bin/env node
'use strict'
const Zeus = require('../lib')

const { argv } = require('yargs')
  .command({
    command: 'init [project-name]',
    aliases: ['i'],
    builder: yargs => yargs.default('projectName', 'zeus-project'),
    desc: 'generate a new project with zeus'
  })
  .example('$0 init zeus-project', 'init the zeus project')
  .demandCommand(1, 'You need to type the operation')
  .usage('Usage: zeus <command> [args]')
  .help('h', 'looking for help')
  .alias('help', 'h')
  .epilog('copyright 2017 NETEASE, ZeusTeam')

new Zeus(argv).start()
