/**
 *  @param argv
 *  argv.mode: {
        alias: 'm',
        default: 'all',
        type: 'string',
        desc: 'Docs Generation Mode',
        group: 'Docs Generation Options:',
        choices: ['components', 'styles', 'all']
    },
    argv.type: {
        alias: 't',
        default: 'all',
        type: 'string',
        desc: 'Type of Project',
        group: 'Docs Generation Options:',
        choices: ['apps', 'libs', 'all']
    }
 */

module.exports = (argv) => {
    const shell = require('shelljs');
    const chalk = require('chalk');
    const cliConfigs = require('../../configs').angularx;
    const _ = require('lodash');
    const angularConfigs = require('../../configs').angular;

    const fs = require('fs-extra');
    let projects = [];

    if (argv.type === 'all') {
        projects = _.map(_.concat(cliConfigs.apps, cliConfigs.libs), 'name');
    }
    else if (argv.type === 'apps') {
        projects = _.map(cliConfigs.apps, 'name')
    }
    else {
        projects = _.map(cliConfigs.libs, 'name')
    }

    console.log(projects);
    projects.forEach(appName => {

        const appConfig = angularConfigs.projects[appName];
        const outputPath = appConfig.architect.build.options.outputPath + '/docs';

        const tsconfigPath = (appConfig.projectType === 'application') ? appConfig.root + '/tsconfig.app.json' :  appConfig.root + '/tsconfig.lib.json';

        fs.ensureDir(outputPath);
        fs.emptyDir(outputPath);

        if (argv.mode === 'components' || argv.mode === 'all') {
            console.log(chalk.yellow('[INFO: AngularX CLI] Generating Component Docs - ' + appName));
            shell.exec('./node_modules/.bin/compodoc -p ' + tsconfigPath + ' -d ' + outputPath);
        }

        if (argv.mode === 'styles' || argv.mode === 'all') {

        }
    });
};
