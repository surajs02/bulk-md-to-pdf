module.exports = {
    DIRS: {
        getRoot() { return process.cwd()+'/' },
        getNotes() { return this.getRoot()+'src/notes/' },
        getBuild() { return this.getRoot()+'build/' },
    },    
};