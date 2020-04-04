const moment = require('moment');
const { mdToPdf } = require('md-to-pdf');
const path = require('path');
const fs = require('fs');
const open = require('open');

const { DIRS } = require('./constants');
const { getFileNamesInDir, extractFileNameParts, deleteFile } = require('./utilFile');
const { logw } = require('./util');

const buildDir = DIRS.getBuild();
if (!fs.existsSync(buildDir)) console.log('No build folder found, creating it...'), fs.mkdirSync(buildDir);

const build = async (notesDirPath = DIRS.getNotes()) => {
    await clean();

    // Allows access note's sibling dirs (e.g., md files might reference notes/../imgs/)
    const notesDirParent = path.join(notesDirPath, '..', '..');

    Promise.all(
        (await getFileNamesInDir(notesDirPath))
            .filter(n => extractFileNameParts(n).ext === 'md')
            .map(n => {
                const noteNoExt = extractFileNameParts(n).name;
                const pdfFileName = `${noteNoExt}_${moment().format('YYYY-MM-DD')}.pdf`;
                return mdToPdf(
                    { path: `${notesDirPath}/${n}` },
                    { 
                        basedir: notesDirParent, // Via md-to-pdf@next (v3+).
                        dest: `${buildDir}/${pdfFileName}`,
                        pdf_options: {
                            displayHeaderFooter: true,
                            headerTemplate: `
                                <style>
                                    section {
                                        margin: 0 auto;
                                        font-family: system-ui;
                                        font-size: 11px;
                                    }
                                </style>
                                <section>
                                    <div>${pdfFileName}</div>
                                </section>
                            `,
                            footerTemplate: `
                                <section>
                                    <div>
                                        Page <span class="pageNumber"></span>
                                        of <span class="totalPages"></span>
                                    </div>
                                </section>
                            `,
                        },

                    }
                );
        })
    )
        .then(outputs => {
            console.log(`Converted ${outputs.length} md files (${notesDirPath}) to pdf files (${buildDir})`);
        })
        .catch(console.error);
};

const openBuild = () => {
    open(buildDir);
}

const clean = async () => {
    const buildFiles = await getFileNamesInDir(buildDir);

    const hasBuildFiles = buildFiles.length < 1;
    if (hasBuildFiles) {
        logw(`No files to clean in ${buildDir}`);
        return;
    };

    const deleteRes = await Promise.all(
        buildFiles.map(f => deleteFile(buildDir+f))
    )
    console.log(`Cleaned ${deleteRes.length} files in ${buildDir}`);
};

module.exports = {
    build,
    openBuild,
    clean,
}