/**
 *  @param argv
 *  argv.mode: {
        alias: 'm',
        default: 'all',
        type: 'string',
        desc: 'Docs Generation Mode',
        group: 'Docs Generation Options:',
        choices: ['api', 'styles', 'all']
    },
    argv.type: {
        alias: 't',
        default: 'all',
        type: 'string',
        desc: 'Type of Project',
        group: 'Docs Generation Options:',
        choices: ['apps', 'libs', 'all']
    },
    argv.coverageTest: {
        alias: c,
        type: 'boolean',
        desc: 'Test for docs coverage',
        group: 'Docs Generation Options:'
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

        const apiOutputPath = (appConfig.projectType === 'application') ? appConfig.architect.build.options.outputPath + '/docs/api-docs'
                                                                        : _.find(cliConfigs.libs, ['name', appName]).outputPath + '/docs/api-docs';
        const stylesOutputPath = (appConfig.projectType === 'application') ? appConfig.architect.build.options.outputPath + '/docs/styles-docs'
                                                                            : _.find(cliConfigs.libs, ['name', appName]).outputPath + '/docs/styles-docs';

        if (argv.mode === 'api' || argv.mode === 'all') {

            if (!argv.coverageTest) {
                console.log(chalk.yellow('[INFO: AngularX CLI] Generating API Docs - ' + appName));

                fs.ensureDir(apiOutputPath);
                fs.emptyDir(apiOutputPath);
            }


            const tsconfigPath = (appConfig.projectType === 'application') ? appConfig.root + '/tsconfig.app.json' :  appConfig.root + '/tsconfig.lib.json';
            const commandToExecute = (argv.coverageTest) ? './node_modules/.bin/compodoc --coverageTest -p ' + tsconfigPath
                                        : './node_modules/.bin/compodoc -p ' + tsconfigPath + ' -d ' + apiOutputPath;

            shell.exec(commandToExecute);
        }

        if (argv.mode === 'styles' || argv.mode === 'all') {

            if (!argv.coverageTest) {
                console.log(chalk.yellow('[INFO: AngularX CLI] Generating Styles Docs - ' + appName));

                fs.ensureDir(stylesOutputPath);
                fs.emptyDir(stylesOutputPath);
            }
        }
    });
};
