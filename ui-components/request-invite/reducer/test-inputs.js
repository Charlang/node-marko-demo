'use strict';

const { assert } = require('chai');
const inputs = require('./inputs');

describe('Redux reducer:', () => {
    describe('inputs:', () => {
        it('Should able to reset or init', () => {
            assert.equal(inputs(undefined, {}).status, 'INIT');
            assert.equal(inputs({}, { type: 'RESET' }).status, 'INIT');
        });
        it('Should able to get start', () => {
            let type = 'START';
            assert.equal(inputs({}, { type }).status, 'START');
        });
        it('Should set name success', () => {
            let type = 'SET_NAME', value = '123';
            assert.equal(inputs({}, { type, value }).name, '123');
            assert.equal(inputs({}, { type, value }).nameErr, false);
            value = '12'; // Only do node sever side validation
            assert.equal(inputs({}, { type, value }).nameErr, false);
        });
        it('Should set email success', () => {
            let type = 'SET_EMAIL', value = 'abc@123';
            let { email, emailErr, emailConfirmed } = inputs(undefined, { type, value });
            assert.equal(email, value);
            assert.equal(emailErr, false);
            assert.equal(emailConfirmed, false);
        });
        it('Should set confirm email and check success', () => {
            let type = 'SET_EMAIL', value = 'abc@123';
            let state = inputs(undefined, { type, value });
            type = 'CONFIRM_EMAIL';
            state = inputs(state, { type, value });
            let { confirmEmail, emailErr, emailConfirmed } = state;
            assert.equal(confirmEmail, value);
            assert.equal(emailErr, false);
            assert.equal(emailConfirmed, true);
            state = inputs(state, { type, value: 'abc' });
            assert.equal(state.emailConfirmed, false);
        });
        it('Should set confirm email and check email status', () => {
            let type = 'SET_EMAIL', value = 'abc@123';
            let state = inputs(undefined, { type, value });
            type = 'CONFIRM_EMAIL';
            value = 'abc';
            state = inputs(state, { type, value });
            let { confirmEmail, emailErr, emailConfirmed } = state;
            assert.equal(confirmEmail, value);
            assert.equal(emailErr, true);
            assert.equal(emailConfirmed, false);
        });
        it('Should update state after submit', () => {
            let type = 'SUBMIT';
            let state = inputs(undefined, { type });
            let { nameErr, emailErr } = state;
            assert.equal(nameErr, true);
            assert.equal(emailErr, true);
            let value = '123';
            type = 'SET_NAME';
            state = inputs(state, { type, value });
            type = 'SET_EMAIL'; // Only do node sever side validation
            state = inputs(state, { type, value });
            type = 'CONFIRM_EMAIL';
            state = inputs(state, { type, value });
            type = 'SUBMIT';
            ({ nameErr, emailErr } = inputs(state, { type }));
            assert.equal(nameErr, false);
            assert.equal(emailErr, false);
        });
        it('Update state with sever side validation results', () => {
            let type = 'ERR', value = 'Email, Name not correct';
            let { nameErr, emailErr } = inputs(undefined, { type, value });
            assert.equal(nameErr, true);
            assert.equal(emailErr, true);
        });
    });
});

