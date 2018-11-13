'use strict';

module.exports = function (req, res, next) {
    res.setHeader('X-Powered-By', 'B&C');
    return next();
};
