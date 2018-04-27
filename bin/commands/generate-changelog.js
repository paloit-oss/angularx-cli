exports.command = 'generate-changelog';
exports.aliases = ['gclog'];
exports.desc = 'Generate Changelog';
exports.builder = {};

exports.handler = (argv) => {
    const chalk = require('chalk');
    console.log(chalk.yellow('[COMMAND: AngularX CLI] Generate Changelog:'));
};
