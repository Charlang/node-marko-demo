'use strict';

// Global test evn setup
process.env.NODE_ENV = 'test';
process.env.PORT = 7000;
process.env.NODE_CONFIG_DIR = './config';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../server');
const { assert, expect, should } = require('chai');
should();  // Modifies `Object.prototype`

let requester = null;

describe('Node Sever: ', function () {
    before(function () {
        requester = chai.request(server).keepOpen();
    });
    after(function () {
        requester.close();
    });
    describe('Home page:', function () {
        it('Should Get success', function (done) {
            Promise.all([requester.get('/')])
                .then(([res]) => {
                    expect(res).to.have.status(200);
                    assert.equal(res.headers['x-powered-by'], 'B&C');
                    done();
                });
        });
    });
    describe('API Resource:', function () {
        it('Should POST success with valid data', function (done) {
            requester.post('/api/invite')
                .send({
                    name: '123',
                    email: '123@123'})
                .end(function(err, res) {
                    res.should.have.status(200);
                    assert.equal(res.body.data, 'Registered');
                    assert.equal(err, null);
                    done();
                });
        });
        it('Should POST with error when name parameters invalid', function (done) {
            requester.post('/api/invite')
                .send({
                    name: '13',
                    email: '123@123'
                }).end(function(err) {
                err.should.have.status(400);
                assert.equal(err.rawResponse, 'data.name should NOT be shorter than 3 characters');
                done();
            });
        });
        it('Should POST with error when email parameters invalid', function (done) {
            requester.post('/api/invite')
                .send({
                    name: '133',
                    email: '123@'
                }).end(function(err) {
                err.should.have.status(400);
                assert.equal(err.rawResponse, 'data.email should match format "email"');
                done();
            });
        });
        it('Should POST with error when name and email both invalid', function (done) {
            requester.post('/api/invite')
                .send({
                    name: '12',
                    email: '123'
                }).end(function(err) {
                err.should.have.status(400);
                assert.equal(err.rawResponse, 'data.name should NOT be shorter than 3 characters\ndata.email should match format "email"');
                done();
            });
        });
    });
});
