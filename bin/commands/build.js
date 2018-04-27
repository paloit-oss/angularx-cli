exports.command = 'build [mode]';
exports.desc = 'Build';
exports.builder = {
    mode: {
        alias: 'm',
        default: 'prod',
        type: 'string',
        desc: 'Build Mode',
        choices: ['prod', 'dev', 'watch', 'package']
    }
};
exports.handler = (argv) => {
    const chalk = require('chalk');
    console.log(chalk.yellow('[COMMAND: AngularX CLI] Build:', argv.mode));
    require('../../lib/index').build(argv);
};
