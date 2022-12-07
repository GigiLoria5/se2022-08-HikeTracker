/* IMPORTS */
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


let authenticatedUser = request.agent(server);

describe('test get hut countries, provinces, cities  WRONG ROLE',()=>{

    step('T0 login [GOOD BUT WRONG ROLE]', (done) => {
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

    step('T1: GET/api/huts/countries [WRONG USER ROLE]', async function () {
        await authenticatedUser
            .get('/api/huts/countries')
            .then(function (res) {
                res.should.have.status(401);
            });
    });

    step('T2: GET/api/huts/provinces [WRONG USER ROLE]', async function () {
        await authenticatedUser
            .get('/api/huts/provinces/'+"Italy")
            .then(function (res) {
                res.should.have.status(401);
            });
    });

    step('T3: GET/api/huts/cities [WRONG USER ROLE]', async function () {
        await authenticatedUser
            .get('/api/huts/cities/'+"Turin")
            .then(function (res) {
                res.should.have.status(401);
            });
    });
});