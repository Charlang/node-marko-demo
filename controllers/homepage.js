'use strict';

const template = require('../pages/homepage/index.marko');
const { getHash } = require('./utils/hashManifest');
const config = require('config');
const CSS_PATH = config.get('header.css');
const JS_PATH = config.get('footer.js');

const i18n = (req, key) => req.i18n.__(key);

module.exports = (req, res) => {
    res.contentType('text/html; charset=utf-8');
    res.marko(template, {
        i18n: {
            head: i18n(req, 'head'),
            body: i18n(req, 'body'),
            footer: i18n(req, 'footer')
        },
        csrfToken: req.csrfToken && req.csrfToken(),
        assets: {
            mainCss: CSS_PATH + getHash('homepage.css'),
            mainJs: JS_PATH + getHash('homepage.js')
        }
    });
};
