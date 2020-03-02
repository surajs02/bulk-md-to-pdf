const mdToPdf = require('md-to-pdf');
const fs = require('fs');
const moment = require('moment');

const { DIRS } = require('./constants');
const { getFileNamesInDir, extractFileNameParts } = require('./utilFile');

const build = async (notesDirPath = DIRS.getNotes()) => {
    const pdfsDir = DIRS.getBuild();

    Promise.all(
        (await getFileNamesInDir(notesDirPath))
            .filter(n => extractFileNameParts(n).ext === 'md')
            .map(n => {
                const noteNoExt = extractFileNameParts(n).name;
                return mdToPdf(
                    `${notesDirPath}/${n}`,
                    { dest: `${pdfsDir}/${noteNoExt}_${moment().format('YYYY-MM-DD')}.pdf` }
                );
        })
    )
        .then(outputs => {
            console.log(`Converted ${outputs.length} md files (${notesDirPath}) to pdf files (${pdfsDir})`)
        })
        .catch(console.error);
}

module.exports = {
    build,
}