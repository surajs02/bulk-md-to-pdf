const fs = require('fs');

module.exports={
    getFileNamesInDir: dir => new Promise((res, rej) => {
        return fs.readdir(dir, (err, files) => err != null ? rej(err) : res(files))
    }),
    
    extractFileNameParts: fileName => {
        const fileNameParts = fileName.split('.');
        return { name: fileNameParts[0], ext: fileNameParts[1] };
    },
    
    deleteFile: path => new Promise((res, rej) => {
        return fs.unlink(path, e => e == null ? res(path) : rej(e));
    }),
}