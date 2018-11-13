'use strict';

const Locale = require("locale");

module.exports = function (req, res, next) {
    const locale = new Locale.Locales(req.headers["accept-language"]);
    const language = locale[0] && locale[0].language || 'en';
    if (!req.cookies['locale']) {
        // 30 days duration for locale cookie
        res.cookie('locale', language, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
        req.i18n.setLocale(language);
    } else {
        req.i18n.setLocaleFromCookie();
    }
    return next();
};
