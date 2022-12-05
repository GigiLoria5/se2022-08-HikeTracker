const chai = require('chai');
const chaiHttp = require('chai-http');
const { step } = require('mocha-steps');
chai.use(chaiHttp);
chai.should();
const app = require('../index.js');
let agent = chai.request.agent(app);
const expect = chai.expect;
const request = require('supertest');
const ParkingDao = require('../dao/ParkingDAO');
const server = "http://localhost:3001";

describe('test Add Parking',()=>{
    let authenticatedUser = request.agent(server);
    let existingParkings;
    const validParking = {
        city: "Torino",
        province: "Piedmont",
        country: "Italy",
        latitude: 15.7,
        longitude: 45.4,
        address: "Address Test",
        capacity: 200
      }
    before('Get all parkings before tests', async function () {
        existingParkings = await ParkingDao.getAllParkingLots();
    });

    step('T0: POST/api/parking [UNAUTHORIZED]', async function() {
        await agent.post('/api/parking')
            .send(validParking)
            .then(function(res) {
                res.should.have.status(401);
            });
    });

    step('T1: DELETE/api/parking [UNAUTHORIZED]', async function() {
        await agent.delete('/api/parking/1')
            .send(validParking)
            .then(function(res) {
                res.should.have.status(401);
            });
    });

    step('T2 login', (done) => {
        authenticatedUser
            .post('/api/sessions')
            .send({
                "username": "g.desantis@localguide.it",
                "password": "password"
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    step('T3: POST/api/parking [GOOD]', async function() {
        await authenticatedUser.post('/api/parking')
            .send(validParking)
            .then(function(res) {
                res.should.have.status(200);
            });
    });

    step('T4: POST/api/parking [REPEATED PARKING]', async function() {
        await authenticatedUser.post('/api/parking')
            .send(validParking)
            .then(function(res) {
                res.should.have.status(422);
            });
    });

    step('T5: POST/api/parking [MISSING COUNTRY]', async function() {
        const wrongParking = validParking;
        wrongParking.country = null;
        await authenticatedUser.post('/api/parking')
            .send(wrongParking)
            .then(function(res) {
                res.should.have.status(422);
            });
    });

    step('T6: POST/api/parking [MISSING PROVINCE]', async function() {
        const wrongParking = validParking;
        wrongParking.province = null;
        await authenticatedUser.post('/api/parking')
            .send(wrongParking)
            .then(function(res) {
                res.should.have.status(422);
            });
    });

    step('T7: POST/api/parking [MISSING CITY]', async function() {
        const wrongParking = validParking;
        wrongParking.city = null;
        await authenticatedUser.post('/api/parking')
            .send(wrongParking)
            .then(function(res) {
                res.should.have.status(422);
            });
    });

    step('T8: POST/api/parking [MISSING LATITUDE]', async function() {
        const wrongParking = validParking;
        wrongParking.latitude = null;
        await authenticatedUser.post('/api/parking')
            .send(wrongParking)
            .then(function(res) {
                res.should.have.status(422);
            });
    });

    step('T9: POST/api/parking [WRONG LATITUDE]', async function() {
        const wrongParking = validParking;
        wrongParking.latitude = "14.2";
        await authenticatedUser.post('/api/parking')
            .send(wrongParking)
            .then(function(res) {
                res.should.have.status(422);
            });
    });

    step('T10: POST/api/parking [MISSING LONGITUDE]', async function() {
        const wrongParking = validParking;
        wrongParking.longitude = null;
        await authenticatedUser.post('/api/parking')
            .send(wrongParking)
            .then(function(res) {
                res.should.have.status(422);
            });
    });

    step('T11: POST/api/parking [WRONG LONGITUDE]', async function() {
        const wrongParking = validParking;
        wrongParking.longitude = "14.2";
        await authenticatedUser.post('/api/parking')
            .send(wrongParking)
            .then(function(res) {
                res.should.have.status(422);
            });
    });

    step('T12: POST/api/parking [MISSING ADDRESS]', async function() {
        const wrongParking = validParking;
        wrongParking.address = null;
        await authenticatedUser.post('/api/parking')
            .send(wrongParking)
            .then(function(res) {
                res.should.have.status(422);
            });
    });

    step('T13: DELETE/api/parking [WRONG PARAMS]', async function() {
        await authenticatedUser.delete('/api/parking/param')
            .send(validParking)
            .then(function(res) {
                res.should.have.status(422);
            });
    });

    step('T14: DELETE/api/parking [WRONG PARAMS]', async function() {
        await authenticatedUser.delete('/api/parking/param')
            .send(validParking)
            .then(function(res) {
                res.should.have.status(422);
            });
    });

    step('T15: DELETE/api/parking [GOOD]', async function() {
        const curParkingLots = await ParkingDao.getAllParkingLots();
        const preId = existingParkings.map(a=>a.id);
        const id = curParkingLots.filter(a=> !preId.includes(a.id))[0].id;
        await authenticatedUser.delete('/api/parking/'+id)

            .send(validParking)
            .then(function(res) {
                res.should.have.status(200);
            });
    });
    
    step('T16: POST/api/parking [WRONG CAPACITY]', async function() {
        const wrongParking = validParking;
        wrongParking.capacity = null;
        await authenticatedUser.post('/api/parking')
            .send(wrongParking)
            .then(function(res) {
                res.should.have.status(422);
            });
    });
});
