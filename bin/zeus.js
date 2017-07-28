#!/usr/bin/env node
'use strict';
const yargs = require('yargs');
const Zeus = require('../lib');
const shell = require('shelljs/global')

const { argv } = require('yargs')
  .command({
    command: 'init [project-name]',
    aliases: ['i'],
    builder: yargs => yargs.default('projectName', 'zeus-project'),
    desc: 'generate a new project with zeus'
  })
  .demandCommand(1, 'You need to type the operation')
  .usage('Usage: zeus <command> [args]')
  .help('h', 'looking for help')
  .alias('help', 'h')
  .epilog('copyright 2017 NETEASE, ZeusTeam')

new Zeus(argv).start()