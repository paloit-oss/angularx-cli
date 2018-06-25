/**
 * Build (Webpack)
 * @param argv
 * {
 *      mode: {
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
 * }
 */
module.exports = (argv) => {
    const shell = require('shelljs');
    const chalk = require('chalk');
    const cliConfigs = require('../../configs').angularx;
    const angularConfigs = require('../../configs').angular;
    const _ = require('lodash');

    /**
     * When mode is 'package' then apps are considered to be libs
     */
    let configuredApps = (argv.mode === 'package') ? cliConfigs.libs : cliConfigs.apps;
    let apps = [];

    /**
     * Check if the cli-config has the app that is input as part of the cli command
     */
    if (argv.apps) {
        if(_.difference(argv.apps, _.map(configuredApps, 'name')).length !== 0) {
            throw new Error(chalk.red('[ERROR: AngularX CLI] You need to configure the app names. Check "angularx.json -> apps"!'));
        }
        apps = argv.apps;
    }
    else {
        apps = _.map(configuredApps, 'name');
    }

    if (argv.mode === 'prod') {
        apps.forEach(appName => {
            console.log(chalk.yellow('[INFO: AngularX CLI] Building the App - ', appName));
            shell.exec('ng build --prod --project ' + appName);
        });
    }
    else if (argv.mode === 'dev') {
        apps.forEach(appName => {
            console.log(chalk.yellow('[INFO: AngularX CLI] Building the App - ', appName));
            shell.exec('ng build --project ' + appName);
        });
    }
    else if (argv.mode === 'watch') {
        apps.forEach(appName => {
            const appConfig = _.find(cliConfigs.apps, (appObj) => { return appObj.name === appName });
            console.log(chalk.yellow('[INFO: AngularX CLI] Building the App - ', appConfig.name));
            shell.exec('ng serve --project ' + appConfig.name + ' --port ' + appConfig.port, (err, stdout, stderr) => {
                if (err) throw err;
            });
        });
    }
    else if (argv.mode === 'package') {
        apps.forEach(appName => {
            console.log(chalk.yellow('[INFO: AngularX CLI] Packaging the Lib - ', appName));
            shell.exec('ng build --project ' + appName);
        });
    }
    else {
        throw new Error(chalk.red('[ERROR: AngularX CLI] You need to specify the Build mode!'));
    }
};
