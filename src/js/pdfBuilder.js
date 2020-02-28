const mdToPdf = require('md-to-pdf');
const fs = require('fs');

const { DIRS } = require('./constants');

const getFileNamesInDir = dir => new Promise((res, rej) => {
    return fs.readdir(dir, (err, files) => err != null ? rej(err) : res(files))
});

const main = async () => {
    const pdfsDir = DIRS.getBuild();

    Promise.all(
        (await getFileNamesInDir(DIRS.getNotes())).map(n => {
            const noteNoExt = n.split('.')[0];
            return mdToPdf(
                `src/notes/${n}`,
                { dest: `${pdfsDir}/${noteNoExt}.pdf` }
            );
        })
    )
        .then(outputs => {
            console.log(`Converted ${outputs.length} md files to pdf files in ${pdfsDir}`)
        })
        .catch(console.error);
};
main();