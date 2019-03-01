/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const merge = require('webpack-merge');
const webpack = require('webpack');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        port: 3000,
        open: false,
        proxy: {
            '/api': 'http://localhost:5000',
        },
        historyApiFallback: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
});
