/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

const outputDirectory = '../build';

module.exports = merge(common, {
    mode: 'production',
    alias: {
        'react-dom$': 'react-dom/profiling',
        'scheduler/tracing': 'scheduler/tracing-profiling',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new CleanWebpackPlugin([outputDirectory]),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
});
