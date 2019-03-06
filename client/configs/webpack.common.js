/* eslint import/no-extraneous-dependencies: ['error', {'devDependencies': true}] */

const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/index.js'],
    output: {
        filename: '[contenthash].[name].build.js',
        chunkFilename: '[contenthash].[name].build.js',
        path: path.join(__dirname, '../build/'),
        publicPath: '/',
    },
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
                use: ['babel-loader', 'eslint-loader'],
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
                test: /(Calendar|calendar).css$/,
                include: /(node_modules|custom)/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: ['raw-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: 'public/index.html',
        }),
    ],
};
