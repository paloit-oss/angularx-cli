exports.command = 'test [type]';
exports.desc = 'Test';
exports.builder = {
  type: {
    default: 'all'
  }
};

exports.handler = (argv) => {
    const chalk = require('chalk');
    console.log(chalk.yellow('[COMMAND: AngularX CLI] Test:'));
};
