'use strict';

const baseWebPack = require('./webpack.base');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(baseWebPack, {
    mode: 'development',
    devtool: "inline-source-map",
    output: {
        filename: '[name].js'
    },
    plugins: [
        new CleanWebpackPlugin(['public/min']),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
});
