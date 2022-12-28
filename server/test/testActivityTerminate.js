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

describe('Terminate activity: good and some errors', () => {

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

    step('T0: POST/activity ', async function () {
        await authenticatedUser
            .post('/api/activity')
            .set('content-type', 'multipart/form-data')
            .field("hike_id", 1)
            .field("start_time", "2022-12-27 22:30:00")
            .then(function (res) {
                res.should.have.status(201);
            });
    });

    step('T2: PUT/activity/terminate [END DATE BEFORE START DATE]', async function () {
        await authenticatedUser
            .put('/api/activity/terminate')
            .set('content-type', 'multipart/form-data')
            .field("end_time", "2022-12-27 22:15:00")
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('T3: PUT/activity/terminate [WRONG END DATE 1]', async function () {
        await authenticatedUser
            .put('/api/activity/terminate')
            .set('content-type', 'multipart/form-data')
            .field("end_time", 1)
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('T4: PUT/activity/terminate [WRONG END DATE 2]', async function () {
        await authenticatedUser
            .put('/api/activity/terminate')
            .set('content-type', 'multipart/form-data')
            .field("end_time", "27/12/2022 22:30")
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('T4: PUT/activity/terminate [WRONG END DATE 2]', async function () {
        await authenticatedUser
            .put('/api/activity/terminate')
            .set('content-type', 'multipart/form-data')
            .field("end_time", "27/20/2022 22:30")
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('T5: PUT/activity/terminate [GOOD]', async function () {
        await authenticatedUser
            .put('/api/activity/terminate')
            .set('content-type', 'multipart/form-data')
            .field("end_time", "2022-12-27 22:45:00")
            .then(function (res) {
                res.should.have.status(204);
            });
    });

    step('T5.5: Delete the previous activity', async function () {
        await activityDao.deleteActivityByHikeIdTerminated(1);
    });

    step('T6: PUT/activity/terminate [NO HIKES RUNNING]', async function () {
        await authenticatedUser
            .put('/api/activity/terminate')
            .set('content-type', 'multipart/form-data')
            .field("end_time", "2022-12-27 22:45:00")
            .then(function (res) {
                res.should.have.status(404);
            });
    });

});

describe('Terminate activity: wrong users', () => {

    let authenticatedUser = request.agent(server);

    step('T0 login', (done) => {
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

    step('T3: PUT/activity/terminate [USER NOT HIKER]', async function () {
        await authenticatedUser
            .put('/api/activity/terminate')
            .set('content-type', 'multipart/form-data')
            .field("end_time", "2022-12-27 22:45:00")
            .then(function (res) {
                res.should.have.status(401);
            });
    });

    // step('T3: PUT/activity/terminate [USER NOT AUTHENTICATED]', async function () {
    //     await agent
    //         .put('/api/activity/terminate')
    //         .set('content-type', 'multipart/form-data')
    //         .field("end_time", "2022-12-27 22:45:00")
    //         .then(function (res) {
    //             res.should.have.status(401);
    //         });
    // });

});

describe('Delete activity', () => {

    let authenticatedUser = request.agent(server);

    step('T0 login', (done) => {
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

    step('T1: DELETE/activity/running [WRONG USER] ', async function () {
        await authenticatedUser
            .delete('/api/activity/running')
            .then(function (res) {
                res.should.have.status(401);
            });
    });

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

    step('T1: DELETE/activity/running [NO HIKES TO DELETE] ', async function () {
        await authenticatedUser
            .delete('/api/activity/running')
            .then(function (res) {
                res.should.have.status(404);
            });
    });

    step('T1.5: POST/activity ', async function () {
        await authenticatedUser
            .post('/api/activity')
            .set('content-type', 'multipart/form-data')
            .field("hike_id", 1)
            .field("start_time", "2022-12-27 22:30:00")
            .then(function (res) {
                res.should.have.status(201);
            });
    });

    step('T2: DELETE/activity/running [GOOD] ', async function () {
        await authenticatedUser
            .delete('/api/activity/running')
            .then(function (res) {
                res.should.have.status(200);
            });
    });

});