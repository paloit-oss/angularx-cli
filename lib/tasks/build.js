/**
 *  Build (Webpack)
 *  @param argv
 *  argv.mode: {
        alias: 'm',
        default: 'prod',
        type: 'string',
        desc: 'Build Mode',
        group: 'Build Options:',
        choices: ['prod', 'dev', 'watch', 'package']
    },
    argv.projects: {
        alias: 'p',
        type: 'array',
        group: 'Build Options:',
        desc: 'Names of the apps to build or serve'
    }
 */
module.exports = (argv) => {
    const shell = require('shelljs');
    const chalk = require('chalk');
    const cliConfigs = require('../../configs').angularx;
    const _ = require('lodash');

    /**
     * When mode is 'package' then apps are considered to be libs
     */
    let configuredProjects = (argv.mode === 'package') ? cliConfigs.libs : cliConfigs.apps;
    let projects = [];

    /**
     * Check if the cli-config has the app that is input as part of the cli command
     */
    if (argv.projects) {
        if(_.difference(argv.projects, _.map(configuredProjects, 'name')).length !== 0) {
            throw new Error(chalk.red('[ERROR: AngularX CLI] You need to configure the app/lib names. Check "angularx.json -> apps/libs"!'));
        }
        projects = argv.projects;
    }
    else {
        projects = _.map(configuredProjects, 'name');
    }

    if (argv.mode === 'prod') {
        projects.forEach(appName => {
            console.log(chalk.yellow('[INFO: AngularX CLI] Building the App for Production - ', appName));
            shell.exec('ng build --prod --project ' + appName);
        });
    }
    else if (argv.mode === 'dev') {
        projects.forEach(appName => {
            console.log(chalk.yellow('[INFO: AngularX CLI] Building the App - ', appName));
            shell.exec('ng build --project ' + appName);
        });
    }
    else if (argv.mode === 'watch') {
        projects.forEach(appName => {
            const appConfig = _.find(cliConfigs.apps, (appObj) => { return appObj.name === appName });
            console.log(chalk.yellow('[INFO: AngularX CLI] Building & Serving the App - ', appConfig.name));
            shell.exec('ng serve --project ' + appConfig.name + ' --port ' + appConfig.port, (err, stdout, stderr) => {
                if (err) throw err;
            });
        });
    }
    else if (argv.mode === 'package') {
        projects.forEach(appName => {
            console.log(chalk.yellow('[INFO: AngularX CLI] Packaging the Lib - ', appName));
            shell.exec('ng build --project ' + appName);
        });
    }
    else {
        throw new Error(chalk.red('[ERROR: AngularX CLI] You need to specify the Build mode!'));
    }
};
