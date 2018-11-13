'use strict';

const https = require('https');
const url = require('url');
const config = require('config');
const API_SERVER_URL = config.get('API.server.url');
const TIME_OUT = config.get('API.server.timeout');
const MAX_SOCKETS = config.get('API.server.maxSockets');
const SUCCESS_CODES = config.get('API.server.successCodes');

const sendRequest = (config, serializedBody) => {
    // Build request
    let option = Object.assign(url.parse(API_SERVER_URL), config);
    let agent = new https.Agent({
        keepAlive: true,
        maxSockets: MAX_SOCKETS
    });
    option.agent = agent;
    return new Promise((resolve, reject) => {
        // Send request
        let request = https.request(option, res => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', data => body += data.toString('utf-8'));
            res.on('end', () => {
                agent.destroy();
                let statusCode = res.statusCode;
                if (!SUCCESS_CODES.includes(statusCode)) {
                    let response = {statusCode};
                    if (res.headers['content-type']
                        && res.headers['content-type'].indexOf('application/json') !== -1) {
                        Object.assign(response, JSON.parse(body));
                    }
                    reject(response);
                }
                resolve(JSON.parse(body));
            })
        });
        // Set socket timeout
        request.on("socket", () => {
            request.setTimeout(TIME_OUT, () => request.abort());
        });
        // Error process
        request.on("error", err => reject(err));
        if (serializedBody) {
            if (serializedBody.pipe) {
                serializedBody.pipe(request);
            } else {
                request.write(serializedBody)
            }
        }
        if (!serializedBody || !serializedBody.pipe) {
            request.end();
        }
    });
};

const GET = (path) => {
    return sendRequest({
        method: 'GET',
        path: path
    });
};

const POST = (path, serializedBody) => {
    return sendRequest({
        method: 'POST',
        path: path
    }, serializedBody);
};

const DELETE = (path) => {
    return sendRequest({
        method: 'DELETE',
        path: path
    });
};

const PUT = (path, serializedBody) => {
    return sendRequest({
        method: 'PUT',
        path: path
    }, serializedBody);
};

module.exports = {
    GET,
    POST,
    DELETE,
    PUT
};
