exports.command = 'lint [type]';
exports.desc = 'Lint';
exports.builder = {
  type: {
    default: 'all'
  }
};

exports.handler = (argv) => {
    const chalk = require('chalk');
    console.log(chalk.yellow('[COMMAND: AngularX CLI] Lint:'));
};
