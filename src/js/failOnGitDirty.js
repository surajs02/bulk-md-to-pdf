const { execSync } = require('child_process');

const isDirty = execSync('git diff --shortstat').toString().length > 0;
if (isDirty) throw new Error('git is dirty!');
