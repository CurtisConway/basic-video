const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    resolve: {
        modules: ['node_modules']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};