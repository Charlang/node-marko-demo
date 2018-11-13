'use strict';

const template = require('../pages/homepage/index.marko');
const { getHash } = require('./utils/hashManifest');

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
            mainJs: getHash('homepage.js'),
            mainCss: getHash('homepage.css')
        }
    });
};
