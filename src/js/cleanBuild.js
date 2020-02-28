// const chalk = require

const { DIRS } = require('./constants');
const { getFileNamesInDir, deleteFile } = require('./utilFile');
const { logw } = require('./util');


const main = async () => {
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
main();

