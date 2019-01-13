const path = require('path');

module.exports = {
    entry: './src/basic-video.js',
    mode: 'development',
    resolve: {
        modules: ['node_modules']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'basic-video.js'
    }
};