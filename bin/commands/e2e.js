exports.command = 'e2e [projects..]';
exports.desc = 'End to End Tests';
exports.builder = {
    projects: {
        alias: 'p',
        type: 'array',
        group: 'E2E Options:',
        desc: 'Names of the apps/libs to test end to end'
    }
};

exports.handler = (argv) => {
    const chalk = require('chalk');
    console.log(chalk.yellow('[COMMAND: AngularX CLI] E2E Tests:'));
    require('../../lib/index').e2e(argv);
};
