const express = require('express');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const globImporter = require('node-sass-glob-importer');

const BASE_DIR = path.resolve(__dirname, '..')

const dotenv = require('dotenv').config({path: BASE_DIR + '/.env'});


const htmlFileNames = fs.readdirSync('./src/html/');

const getEntries = () => {
    const entries = [
        './src/js/app.js',
        './src/scss/app.scss'
    ];

    htmlFileNames.forEach(filename => {
        entries.push(`./src/html/${filename}`);
    });

    return entries;
};

const getPlugins = () => {
    const plugins = [
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin({
            clearConsole: true,
        }),
        new webpack.ProvidePlugin({
           $: "jquery",
           jQuery: "jquery"
       }),
       new webpack.DefinePlugin({
         "process.env": JSON.stringify(dotenv.parsed)
       })
    ];
    htmlFileNames.forEach(filename => {
        const splitted = filename.split('.');
        if (splitted[1] === 'html') {
            plugins.push(
                new HtmlWebpackPlugin({
                    template: `./src/html/${filename}`,
                    filename: `./${filename}`
                }),
            );
        }
    });

    return plugins;
};

const config = {
    entry: getEntries(),
    output: {
        filename: 'bundle.js',
    },
    devServer: {
        host : '0.0.0.0',
        disableHostCheck: true,
        contentBase: './src/html',
        watchContentBase: true,
        hot: true,
        open: true,
        inline: true,
        quiet: true,
        historyApiFallback: true,
        before: function (app) {
            app.use('/assets', express.static('./src/assets'));
            app.use('/img', express.static('./src/assets/img'));
        }
    },
    plugins: getPlugins(),
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(html)$/,
                loader: path.resolve(__dirname, 'loader/html-loader.js'),
                options: {
                    html: htmlFileNames
                }
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                }
            },
            {
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            url: false
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: () => [
                                require('autoprefixer')({
                                    browsers: ['ie >= 8', 'last 4 version']
                                }),
                            ]
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            importer: globImporter(),
                            sourceMap: true
                        }
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jpg', '.html', '.scss'],
    },
};


module.exports = config
