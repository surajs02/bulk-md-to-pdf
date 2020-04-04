const path = require('path');

module.exports = {
    DIRS: {
        getRoot() { return path.join(process.cwd()) },
        getNotes() { return path.join(this.getRoot(), 'src/notes') },
        getBuild() { return path.join(this.getRoot(), 'build') },
    },    
};