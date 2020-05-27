const chalk = require('chalk');

const numToLetterUuid = num => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    return `${num}`.split('').map(n => letters[n]).join('');
};

module.exports = {
    logw: (...args) => console.log(chalk.yellow(args)),
    loge: (...args) => console.log(chalk.red(args)),
    genNixLetterUuid: () => numToLetterUuid(Date.now()),
};
