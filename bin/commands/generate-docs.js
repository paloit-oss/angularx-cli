exports.command = 'generate-docs [type]';
exports.aliases = ['gdocs'];
exports.desc = 'Generate Docs';
exports.builder = {
  type: {
    default: 'all'
  }
};

exports.handler = (argv) => {
    const chalk = require('chalk');
    console.log(chalk.yellow('[COMMAND: AngularX CLI] Generate API Docs:'));
};
