const moment = require('moment');
const { mdToPdf } = require('md-to-pdf');
const path = require('path');

const { DIRS } = require('./constants');
const { getFileNamesInDir, extractFileNameParts, deleteFile } = require('./utilFile');
const { logw } = require('./util');

const build = async (notesDirPath = DIRS.getNotes()) => {
    const pdfsDir = DIRS.getBuild();

    // Allows access note's sibling dirs (e.g., md files might reference notes/../imgs/)
    const notesDirParent = path.join(notesDirPath, '..', '..');

    Promise.all(
        (await getFileNamesInDir(notesDirPath))
            .filter(n => extractFileNameParts(n).ext === 'md')
            .map(n => {
                const noteNoExt = extractFileNameParts(n).name;
                return mdToPdf(
                    { path: `${notesDirPath}/${n}` },
                    { 
                        basedir: notesDirParent, // Via md-to-pdf@next (v3+).
                        dest: `${pdfsDir}/${noteNoExt}_${moment().format('YYYY-MM-DD')}.pdf`,
                    }
                );
        })
    )
        .then(outputs => {
            console.log(`Converted ${outputs.length} md files (${notesDirPath}) to pdf files (${pdfsDir})`)
        })
        .catch(console.error);
};

const clean = async () => {
    const build = DIRS.getBuild();
    const buildFiles = await getFileNamesInDir(build);

    const hasBuildFiles = buildFiles.length < 1;
    if (hasBuildFiles) {
        logw(`No files to clean in ${build}`);
        return;
    };

    const deleteRes = await Promise.all(
        buildFiles.map(f => deleteFile(build+f))
    )
    console.log(`Cleaned ${deleteRes.length} files in ${build}`);
};

module.exports = {
    build,
    clean,
}