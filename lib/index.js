module.exports = {
    build: require('./tasks/build'),
    clean: require('./tasks/clean'),
    checkNodeJSVersion: require('./tasks/check-node-version'),
    extractMockAPI: require('./tasks/extract-mock-api'),
    e2e: require('./tasks/e2e'),
    docs: require('./tasks/generate-docs')
};

