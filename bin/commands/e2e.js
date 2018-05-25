exports.command = 'e2e [apps..]';
exports.desc = 'End to End Tests';
exports.builder = {
    apps: {
        alias: 'a',
        type: 'array',
        group: 'E2E Options:',
        desc: 'Names of the apps to test end to end'
    }
};

exports.handler = (argv) => {
    const chalk = require('chalk');
    console.log(chalk.yellow('[COMMAND: AngularX CLI] E2E Tests:'));
    require('../../lib/index').e2e(argv);
};
