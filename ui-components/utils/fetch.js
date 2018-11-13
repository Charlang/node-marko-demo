'use strict';

require('whatwg-fetch');

const parseResponse = (response) => {
    const code = response.status;
    return ([200, 201, 204].includes(code) ? response.json() : response.text()).then((body) => ({
        status: code,
        body
    }));
};

module.exports.sendInvite = (body) => {
    return fetch('/api/invite', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(parseResponse);
};
