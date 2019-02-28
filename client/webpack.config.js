const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const outputDirectory = 'build';

module.exports = (env, argv) => ({
    mode: argv.mode,
    entry: ['./src/index.js'],
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: ['lodash'],
                        },
                    },
                    {
                        loader: 'eslint-loader',
                    },
                ],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true },
                    },
                ],
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|custom)/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[local]__[folder]--[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                    },
                ],
            },
            {
                test: /(_datepicker.css|datepickerOverrides.css)$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: ['raw-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
        ],
    },
    devtool: argv.mode === 'production' ? 'none' : 'eval-source-map',
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
        new HtmlWebPackPlugin({
            template: './public/index.html',
            filename: './index.html',
        }),
        new LodashModuleReplacementPlugin(),
        new BundleAnalyzerPlugin(),
    ],
});
