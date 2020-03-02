#!/usr/bin/env node
// The above shebang is needed for npm link.

const program = require('commander');

const pdfBuilder = require('./pdfBuilder');
const { version, description } = require('./../../package.json')
const { DIRS } = require('./constants');

program
    .version(version)
    .description(description)

program
    .command('build <notesDirPath>')
    .description('`Builds md in path to pdf (defaults to ${DIRS.getBuild()} if no path given)`')
    .action(notesDirPath => {
        pdfBuilder.build(notesDirPath)
    });
    
program.parse(process.argv);

// console.log('program: '+JSON.stringify(program));
// console.log('notesDirPath: '+program.notesDirPath);
    
// pdfBuilder.build(program.notesDirPath);