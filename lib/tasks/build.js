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
        },
        includeBinary: {
            alias: 'ib',
            type: 'boolean',
            group: 'Build Options:',
            desc: 'Build from the Binary Packages'
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
     * When mode is 'package' then apps are considered to be libs
     */
    if (argv.mode === 'package') {
        cliApps = cliConfigs.libs;
    }

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

    if (argv.mode === 'prod') {
        apps.forEach(app => {
            if(argv.includeBinary) {
                app = app + '-with-packages';
            }
            console.log(chalk.yellow('[INFO: AngularX CLI] Building the App - ', app));
            shell.exec('ng build --prod --app ' + app);
        });
    }
    else if (argv.mode === 'dev') {
        apps.forEach(app => {
            console.log(chalk.yellow('[INFO: AngularX CLI] Building the App - ', app));
            shell.exec('ng build --app ' + app);
        });
    }
    else if (argv.mode === 'watch') {
        apps.forEach(appName => {
            const appConfig = _.find(cliConfigs.apps, (appObj) => { return appObj.name === appName });
            console.log(chalk.yellow('[INFO: AngularX CLI] Building the App - ', appConfig.name));
            shell.exec('ng serve --app ' + appConfig.name + ' --port ' + appConfig.port, (err, stdout, stderr) => {
                if (err) throw err;
            });
        });
    }
    else if (argv.mode === 'package') {
        apps.forEach(appName => {
            console.log(chalk.yellow('[INFO: AngularX CLI] Packaging the Lib - ', appName));
            shell.exec('ng-packagr -p libs/' + appName + '/package.json');
        });
    }
    else {
        throw new Error(chalk.red('[ERROR: AngularX CLI] You need to specify the Build mode!'));
        process.exit(1);
    }
};
