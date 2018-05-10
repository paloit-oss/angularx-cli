const webpackMerge = require('webpack-merge');
const packageConfig = require(process.cwd() + '/.angularx-cli.json') || {};

const cliDefaultConfigs = {
    minimumNodeVersion: 8,
    outputFolderPaths : {
        output: './dist',
        docs: './docs',
        coverage: './coverage',
        mockapi: './mock-api'
    },
    server : {
        port: 9000,
        emulatorPort: 7000,
        emulatorAPIFolderPath: '/api-endpoints'
    }
};
module.exports = webpackMerge(cliDefaultConfigs, packageConfig);
