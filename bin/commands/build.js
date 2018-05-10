exports.command = 'build [mode] [apps..] [includeBinary]';
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
    },
    includeBinary: {
        alias: 'ib',
        type: 'boolean',
        group: 'Build Options:',
        desc: 'Build from the Binary Packages'
    }
};
exports.handler = (argv) => {
    const chalk = require('chalk');
    console.log(chalk.yellow('[COMMAND: AngularX CLI] Build:', argv.mode));
    require('../../lib/index').build(argv);
};
