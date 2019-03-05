/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    // devtool: 'eval-source-map',
    plugins: [
        new CleanWebpackPlugin(['build'], {
            root: path.join(__dirname, '/..'),
        }),
        new BrotliPlugin({
            asset: '[fileWithoutExt].br[query]',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
});
