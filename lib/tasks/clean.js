/**
 * Deletes folders/files
 * @param argv
 *  argv.all: {
        type: 'boolean',
        description: 'Deletes all the folders/files specified in the cli config \'folder_paths\' '
    },
    argv.files: {
        type: 'array',
        description: 'Deletes the custom folder/files specified as parameters'
    }
 */

module.exports = (argv) => {
    const del = require('del');
    const _ = require('lodash');
    const chalk = require('chalk');
    const cliConfigs = require('../../configs').angularx;

    let filesToDelete = [];

    if(argv.all) {
        filesToDelete.push(cliConfigs.outputFolder + '**');
    }

    if(argv.files) {
        filesToDelete = _.concat(filesToDelete, argv.files);
    }

    del(filesToDelete);

    console.log(chalk.green('[Success: AngularX CLI] Successfully deleted folders/files: ', filesToDelete));
};
