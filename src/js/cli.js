#!/usr/bin/env node
// The above shebang is needed for npm link.

const program = require('commander');

const { DIRS } = require('./constants');
const pdfBuilder = require('./pdfBuilder');
const { version, description } = require('./../../package.json')

const buildDir = DIRS.getBuild();

program
    .version(version)
    .description(description)

program
    .command('build <notesDirPath>')
    .alias('b')
    .description(`Builds md in path to pdf (defaults to ${buildDir} if no path given)`)
    .action(notesDirPath => {
        pdfBuilder.build(notesDirPath)
    });

program
    .command('open-build')
    .alias('o')
    .description(`Opens build folder (${buildDir})`)
    .action(() => {
        pdfBuilder.openBuild();
    });

program
    .command('clean')
    .alias('c')
    .description(`Cleans pdf' s in ${DIRS.getBuild()}`)
    .action(() => pdfBuilder.clean());
    
program.parse(process.argv);