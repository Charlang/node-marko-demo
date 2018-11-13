'use strict';

const webpack = require('webpack');
const baseWebPack = require('./webpack.base');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(baseWebPack, {
    mode: 'production',
    output: {
        filename: '[name].[hash].js'
    },
    optimization: {
        minimizer: [new UglifyJsPlugin({
            parallel: 6,
            extractComments: true,
            uglifyOptions: {
                warnings: false,
                parse: {},
                compress: {},
                mangle: true, // Note `mangle.properties` is `false` by default.
                output: null,
                toplevel: false,
                nameCache: null,
                ie8: false,
                keep_fnames: false
            }
        })]
    },
    plugins: [
        new CleanWebpackPlugin(['public/min']),
        new webpack.HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].[hash].css",
            chunkFilename: "[id].css"
        }),
        new ManifestPlugin()
    ]
});

