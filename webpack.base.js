'use strict';

const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        homepage: './pages/homepage/client.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/min')
    },
    resolve: {
        extensions: ['.js', '.marko'],
        modules: ['./', 'node_modules']
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: [
                    /node_modules/,
                    /marko.js$/
                ],
                loader: "eslint-loader",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    "file-loader"
                ]
            },
            {
                test: /\.marko$/,
                loader: "marko-loader"
            }
        ]
    },
    plugins: [
        // Avoid publishing files when compilation failed:
        new webpack.NoEmitOnErrorsPlugin()
    ]
};
