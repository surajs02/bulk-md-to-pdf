const chalk = require('chalk');

module.exports = {
    logw: (...args) => console.log(chalk.yellow(args)),
    loge: (...args) => console.log(chalk.red(args)),
};
