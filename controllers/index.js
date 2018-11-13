'use strict';

const express = require('express');
const router = express.Router();
const homepageController = require('./homepage');
const apiResource = require('./apiResource');

router.use('/api', apiResource);
router.use('/', homepageController);

module.exports = router;
