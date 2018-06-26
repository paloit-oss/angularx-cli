exports.command = 'generate-docs [mode] [type]';
exports.aliases = ['docs'];
exports.desc = 'Generate Docs';
exports.builder = {
    mode: {
        alias: 'm',
        default: 'all',
        type: 'string',
        desc: 'Docs Generation Mode',
        group: 'Docs Generation Options:',
        choices: ['components', 'styles', 'all']
    },
    type: {
        alias: 't',
        default: 'all',
        type: 'string',
        desc: 'Type of Project - Apps or Libs',
        group: 'Docs Generation Options:',
        choices: ['apps', 'libs', 'all']
    }
};

exports.handler = (argv) => {
    const chalk = require('chalk');
    console.log(chalk.yellow('[COMMAND: AngularX CLI] Generate API Docs:'));
    require('../../lib/index').docs(argv);
};
