const merge = require('webpack-merge'),
    path = require('path'),
    webpack = require('webpack'),
    common = require('./webpack.common.js');

module.exports = merge(common, {
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '10.16.212.20',
        port: 8080
    }
});