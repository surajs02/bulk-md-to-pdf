const mdToPdf = require('md-to-pdf');
const fs = require('fs');
const moment = require('moment');

const { DIRS } = require('./constants');
const { getFileNamesInDir, extractFileNameParts } = require('./utilFile');

const main = async () => {
    const pdfsDir = DIRS.getBuild();

    Promise.all(
        (await getFileNamesInDir(DIRS.getNotes()))
            .filter(n => extractFileNameParts(n).ext === 'md')
            .map(n => {
                const noteNoExt = extractFileNameParts(n).name;
                return mdToPdf(
                    `src/notes/${n}`,
                    { dest: `${pdfsDir}/${noteNoExt}_${moment().format('YYYY-MM-DD')}.pdf` }
                );
        })
    )
        .then(outputs => {
            console.log(`Converted ${outputs.length} md files to pdf files in ${pdfsDir}`)
        })
        .catch(console.error);
};
main();