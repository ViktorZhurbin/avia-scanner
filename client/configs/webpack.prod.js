/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const CleanWebpackPlugin = require('clean-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const outputDirectory = '../build';

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['eslint-loader'],
            },
        ],
    },
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
        new CleanWebpackPlugin([outputDirectory]),
    ],
});
