exports.command = 'build [mode] [projects..]';
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
    projects: {
        alias: 'p',
        type: 'array',
        group: 'Build Options:',
        desc: 'Names of the apps/libs to build, package or serve'
    }
};
exports.handler = (argv) => {
    const chalk = require('chalk');
    console.log(chalk.yellow('[COMMAND: AngularX CLI] Build:', argv.mode));
    require('../../lib/index').build(argv);
};
