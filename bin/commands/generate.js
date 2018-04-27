exports.command = 'generate [type]';
exports.aliases = ['g'];
exports.desc = 'Generate Blueprints/Boilerplate';
exports.builder = {
};

exports.handler = (argv) => {
    const chalk = require('chalk');
    console.log(chalk.yellow('[COMMAND: AngularX CLI] Generate Blueprints/Boilerplate:'));
};
