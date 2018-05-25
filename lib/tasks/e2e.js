/**
 * Build (Webpack)
 * @param argv
 * {
 *      apps: {
            alias: 'a',
            type: 'array',
            group: 'E2E Options:',
            desc: 'Names of the apps to test end to end'
        }
 * }
 */
module.exports = (argv) => {
    const shell = require('shelljs');
    const chalk = require('chalk');
    const cliConfigs = require('../../default-config');
    const _ = require('lodash');

    let cliApps = cliConfigs.apps;
    let apps = [];

    /**
     * Check if the cli-config has the app that is input as part of the cli command
     */
    if (argv.apps) {
        if(_.difference(argv.apps, _.map(cliApps, 'name')).length !== 0) {
            throw new Error(chalk.red('[ERROR: AngularX CLI] You need to configure the app names. Check ".angularx-cli.json -> apps"!'));
            process.exit(1);
        }
        apps = argv.apps;
    }
    else {
        apps = _.map(cliApps, 'name');
    }

    apps.forEach(app => {
        console.log(chalk.yellow('[INFO: AngularX CLI] E2E Testing the App - ', app));
        shell.exec('ng e2e --app ' + app);
    });
};
