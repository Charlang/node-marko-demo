'use strict';

const express = require('express');
const router = express.Router();
const config = require('config');
const { POST } = require('../services/utils/rest-call');
const requestInvite = config.get('API.server.endPoints.requestInvite');
const inviteReqSchema = require('./api-schema/invite-request');
const Ajv = require('ajv');

// /api/invite
router.post('/invite', (req, res) => {
    res.set('Content-Type', 'application/json');

    // Server side validation
    let ajv =  new Ajv({
        $data: true,
        allErrors: true
    });
    if (!ajv.validate(inviteReqSchema, req.body)) {
        let data = ajv.errorsText(ajv.errors,  { separator: '\n' });
        res.status(400).send(data);
        return;
    }

    // Process with valid request
    POST(requestInvite, JSON.stringify(req.body)).then((data) => {
        res.status(200).send({data});
    }).catch(err => {
        console.error(`Err call [/api/invite] with parameters : ${JSON.stringify(req.body)} return ${err.statusCode ? JSON.stringify(err) : err}`.red);
        res.status(err.statusCode || 500).send(err && err.errorMessage);
    });
});

module.exports = router;
