exports.command = 'build [mode] [apps..]';
exports.desc = 'Build';
exports.builder = {
    mode: {
        alias: 'm',
        default: 'prod',
        type: 'string',
        desc: 'Build Mode',
        group: 'Build Options:',
        choices: ['prod', 'dev', 'watch', 'package']
    },
    apps: {
        alias: 'a',
        type: 'array',
        group: 'Build Options:',
        desc: 'Names of the apps to build or serve'
    }
};
exports.handler = (argv) => {
    const chalk = require('chalk');
    console.log(chalk.yellow('[COMMAND: AngularX CLI] Build:', argv.mode));
    require('../../lib/index').build(argv);
};
