'use strict';

const webpack = require('webpack');
const webpackConfig = require('./webpack.dev');
const { series, watch } = require('gulp');
const { spawn } = require('child_process');

// Webpack build
function build() {
    return new Promise(resolve => webpack(webpackConfig, (err, stats) => {
        if (err) console.log('Webpack', err);
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }));
        resolve();
    }));
}

// Spawn node process
let nodeApp = null;
function reStartServer() {
    return new Promise(resolve => {
        if (nodeApp) {
            nodeApp.kill();
        }
        nodeApp = spawn(
            "node", ["server.js"],
            {
                stdio: "inherit"
            }
        );
        nodeApp.on("close", code => {
            if (code === 8) {
                console.log("Error detected, fix error or [rs] to retry");
            }
        });
        resolve();
    });
}

// Kill process on exit
process.on('exit', function() {
    if (nodeApp) nodeApp.kill()
});

// Gulp watch file changes
function watchChange(cb) {
    watch(
        [
            '*.js',
            '*.json',
            './**/*.marko',
            './**/*.scss',
            './**/*.json',
            './**/*.js'
        ],
        {
            ignored: [
                './**/*.marko.js',
                './public/min/*.*'
            ]
        },
        series(build, reStartServer));
    cb();
}

exports.default = series(build, reStartServer, watchChange);
