const path = require('path');
const { execSync } = require('child_process');

const { name } = require('./../../package.json')

const nodeDir = execSync('npm root -g')
    .toString()
    .split('\n')
    [0]
    .replace(/\r/, ''); // Remove win line end.
const rootDir = nodeDir + '/' + name;

module.exports = {
    DIRS: {
        rootDir,
        getCss() { return path.join(rootDir, '/src/css') },
        getNotes() { return path.join(rootDir, '/src/notes') },
        getBuild() { return path.join(process.cwd(), '/build') },
    },
};