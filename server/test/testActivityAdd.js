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

describe('Add activity', () => {

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

    step('T1: POST/activity [GOOD]', async function () {
        await authenticatedUser
            .post('/api/activity')
            .set('content-type', 'multipart/form-data')
            .field("hike_id", 1)
            .field("start_time", "2022-12-27 07:30")
            .then(function (res) {
                res.should.have.status(201);
            });
    });

    step('T2: GET/activity/running [GOOD]', async function () {
        await authenticatedUser
            .get('/api/activity/running')
            .then(function (res) {
                res.should.have.status(200);
            });
    });

    step('T3: POST/activity [ACTIVITY ALREADY RUNNING]', async function () {
        await authenticatedUser
            .post('/api/activity')
            .set('content-type', 'multipart/form-data')
            .field("hike_id", 2)
            .field("start_time", "2022-12-27 09:30")
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('T3.5: Delete the previous activity', async function () {
        let activities = await activityDao.getRunningActivity(1);
        await activityDao.deleteActivityByHikeId(1);
        activities = await activityDao.getRunningActivity(1);
    });

    step('T4: GET/activity/running [NO ACTIVITY]', async function () {
        await authenticatedUser
            .get('/api/activity/running')
            .then(function (res) {
                res.should.have.status(200); //the API exits w/ status 200 and returns an empty object
            });
    });

    step('T5: POST/activity [NEGATIVE ID]', async function () {
        await authenticatedUser
            .post('/api/activity')
            .set('content-type', 'multipart/form-data')
            .field("hike_id", -1)
            .field("start_time", "2022-12-27 07:30")
            .then(function (res) {
                res.should.have.status(404); //It will not find the hike
            });
    });

    step('T6: POST/activity [WRONG TYPE ID (1)]', async function () {
        await authenticatedUser
            .post('/api/activity')
            .set('content-type', 'multipart/form-data')
            .field("hike_id", 33.3)
            .field("start_time", "2022-12-27 07:30")
            .then(function (res) {
                res.should.have.status(422); //It will stop at initial input validation
            });
    });

    step('T7: POST/activity [WRONG TYPE ID (2)]', async function () {
        await authenticatedUser
            .post('/api/activity')
            .set('content-type', 'multipart/form-data')
            .field("hike_id", "casa")
            .field("start_time", "2022-12-27 07:30")
            .then(function (res) {
                res.should.have.status(422); //It will stop at initial input validation
            });
    });

    step('T8: POST/activity [HIKE NOT IN THE DB]', async function () {
        await authenticatedUser
            .post('/api/activity')
            .set('content-type', 'multipart/form-data')
            .field("hike_id", 98765)
            .field("start_time", "2022-12-27 07:30")
            .then(function (res) {
                res.should.have.status(404); //It will not find the hike
            });
    });

    step('T9: POST/activity [WRONG TYPE TIME]', async function () {
        await authenticatedUser
            .post('/api/activity')
            .set('content-type', 'multipart/form-data')
            .field("hike_id", 1)
            .field("start_time", 42)
            .then(function (res) {
                res.should.have.status(422); //It will stop at initial input validation
            });
    });

    step('T10: POST/activity [WRONG TIME FORMAT]', async function () {
        await authenticatedUser
            .post('/api/activity')
            .set('content-type', 'multipart/form-data')
            .field("hike_id", 1)
            .field("start_time", "27/12/2022 07:30")
            .then(function (res) {
                res.should.have.status(422); //It will stop at initial input validation
            });
    });

    step('T11: POST/activity [WRONG TIME]', async function () {
        await authenticatedUser
            .post('/api/activity')
            .set('content-type', 'multipart/form-data')
            .field("hike_id", 1)
            .field("start_time", "2022-12-32 07:30")
            .then(function (res) {
                res.should.have.status(422); //It will stop at initial input validation
            });
    });

    



});