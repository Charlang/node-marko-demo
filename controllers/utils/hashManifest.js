'use strict';

let contentHashManifest = {};
if (process.env.NODE_ENV === 'production') {
    try {
        contentHashManifest = require('../../public/min/manifest');
    } catch {
        console.error('Hash Manifest is missing\n'.red);
    }
}

module.exports.getHash = (key) => {
    return contentHashManifest[key] || key;
};
