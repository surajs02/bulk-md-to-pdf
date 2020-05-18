const path = require('path');

module.exports = {
    DIRS: {
        getRoot() { return path.join(process.cwd()) },
        getCss() { return path.join(this.getRoot(), 'src/css') },
        getNotes() { return path.join(this.getRoot(), 'src/notes') },
        getBuild() { return path.join(this.getRoot(), 'build') },
    },
};