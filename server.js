'use strict';

require('marko/express');
require('marko/node-require');
require('colors');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const i18n = require('i18n-2');
const csrf = require('csurf');
const zlib = require('zlib');
const compression = require('compression');
const config = require('config');
const staticRoot = config.get('staticRoot');

const localeMiddleWare = require('./middlewares/locale');
const headerMiddleWare = require('./middlewares/header');

const app = express();

// Compression setup for app
function shouldCompress (req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }
    // fallback to standard filter function
    return compression.filter(req, res)
}
app.use(compression({
    filter: shouldCompress,
    flush: zlib.Z_SYNC_FLUSH
}));

// i18n init
i18n.expressBind(app, {
    locales: ['en', 'zh'],
    cookieName: 'locale',
    extension: ".json",
    directory: "./config/locales",
    devMode: false
});

// Static
app.use(staticRoot, express.static(process.cwd() + staticRoot, {
    etag: process.env.NODE_ENV === 'production' ? true : false,
    maxage: process.env.NODE_ENV === 'production' ? 0 : '30d',
    index: false,
    setHeaders: function (res) {
        res.set('X-Powered-By', 'B&C');
    }
}));

// Strong etag for dynamic is exist
app.set('etag', 'strong');

// Parser header
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Disable morgan and csrf only on Mocha test
if (process.env.NODE_ENV !== 'test') {
    // Logging
    app.use(morgan('combined'));
    // Against CSRF
    app.use(csrf({ cookie: true }));
}

// Middleware start
app.use(localeMiddleWare);
app.use(headerMiddleWare);

// Route page endpoints
app.use('/', require('./controllers'));

// Serve the files on port with ENV specified.
app.listen(process.env.PORT, () => {
    console.log(`[Server started on port ${process.env.PORT} !]`.white.bgGreen);
});

// Export app for Mocha test
if (process.env.NODE_ENV === 'test') {
    module.exports = app;
}
