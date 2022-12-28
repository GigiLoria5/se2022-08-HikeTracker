/* IMPORTS */
const activityDao = require('../dao/ActivityDAO');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { step } = require('mocha-steps');
chai.use(chaiHttp);
chai.should();
const app = require('../index.js');
const request = require('supertest');
let agent = chai.request.agent(app);
const server = "http://localhost:3001";
const expect = chai.expect;

describe('Completed activity', () => {

    let authenticatedUser = request.agent(server);

    step('T0 login', (done) => {
        authenticatedUser
            .post('/api/sessions')
            .send({
                "username": "c.basile@hiker.it",
                "password": "password"
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    step('T1: GET/activities/completed [GOOD]', async function () {
        await authenticatedUser
            .get('/api/activities/completed')
            .then(function (res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
            });
    });

    step('T1.5 login', (done) => {
        authenticatedUser
            .post('/api/sessions')
            .send({
                "username": "manager@manager.com",
                "password": "password"
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    step('T2: GET/activities/completed [WRONG USER ROLE]', async function () {
        await authenticatedUser
            .get('/api/activities/completed')
            .then(function (res) {
                res.should.have.status(401);
            });
    });

    step('T3: GET/activities/completed [USER NOT AUTHENTICATED]', async function () {
        await agent
            .get('/api/activities/completed')
            .then(function (res) {
                res.should.have.status(401);
            });
    });

});