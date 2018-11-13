'use strict';
const { createStore } = require('redux');
const inputs = require('./inputs');

module.exports.getStore = () => {
    return createStore(inputs);
};
