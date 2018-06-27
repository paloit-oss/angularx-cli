const webpackMerge = require('webpack-merge');
const packageConfig = require(process.cwd() + '/angularx.json') || {};

const cliDefaultConfigs = {
    minimumNodeVersion: 8,
    outputFolder: './dist',
    server : {
        port: 9000,
        emulatorPort: 7000,
        emulatorAPIFolderPath: '/api-endpoints'
    }
};
module.exports = {
    'angular': require(process.cwd() + '/angular.json'),
    'angularx': webpackMerge(cliDefaultConfigs, packageConfig),
    'nx': require(process.cwd() + '/nx.json')
}
