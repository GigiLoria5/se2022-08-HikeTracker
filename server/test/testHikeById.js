/* IMPORTS */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { step } = require('mocha-steps');
chai.use(chaiHttp);
chai.should();
const app = require('../index.js');
let agent = chai.request.agent(app);
const expect = chai.expect;
const request = require('supertest');
const db = require('../dao/db.js');
const server = "http://localhost:3001";

let authenticatedUser = request.agent(server);

describe('test HikeAPIById',()=>{

    step('T1: GET/api/hike/:id [GOOD]', async function() {
        await agent.get('/api/hike/8')
                    .then(function(res) {
                        res.should.have.status(200);

                    });
    });

    step('T2: GET/api/hike/:id [ID NOT VALID]', async function() {
        await agent.get('/api/hike/8.5')
                    .then(function(res) {
                        res.should.have.status(422);
                    });
    });

    step('T3: GET/api/hike/:id [ID MISSING]', async function() {
        await agent.get('/api/hike/')
                    .then(function(res) {
                        res.should.have.status(404);
                    });
    });

    step('T4 login', (done) => {
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

    step('T5: GET/api/hike/:id [GOOD WITH MAP]', async function() {
        await authenticatedUser.get('/api/hike/8')
                    .then(function(res) {
                        res.body.should.haveOwnProperty('gpx_content');
                        res.should.have.status(200);
                    });
    });
  
});