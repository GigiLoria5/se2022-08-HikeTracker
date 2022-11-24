/* IMPORTS */
const HutDAO = require('../dao/HutDAO');
const UserDAO = require('../dao/UserDAO');
const fs = require('fs');
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

describe('test Add hut wrong role', () => {

    let authenticatedUser = request.agent(server);

    step('T0 login [GOOD BUT WRONG ROLE]', (done) => {
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

    step('T2: POST/api/huts [WRONG USER ROLE]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .send({
                "name": "Hut test",
                "city": "Turin",
                "province": "TO",
                "country": "Italy",
                "address": "Hut route 66",
                "altitude": 1950 ,
                "description": "Amazing hut in the middle of the mountains",
                "beds_number": 10,
                "latitude": 15.7,
                "longitude": 45.4,
                "phone_number" : "+393331171111",
                "email" : "hut@hut.it",
                "website" : "www.hut.com",
                "type" : "alpine_hut"
              })
            .then(function (res) {
                res.should.have.status(401);
            });
    });
});

describe('test Add hut other errors', () => {

    let authenticatedUser = request.agent(server);

    step('T1: POST/api/huts [USER NOT AUTHENTICATED]', async function () {
        await agent
            .post('/api/hikes')
            .send({
                "name": "Hut test",
                "city": "Turin",
                "province": "TO",
                "country": "Italy",
                "address": "Hut route 66",
                "altitude": 1950 ,
                "description": "Amazing hut in the middle of the mountains",
                "beds_number": 10,
                "latitude": 15.7,
                "longitude": 45.4,
                "phone_number" : "+393331171111",
                "email" : "hut@hut.it",
                "website" : "www.hut.com",
                "type" : "alpine_hut"
              })
            .then(function (res) {
                res.should.have.status(401);
            });
    });

    step('T2 login [GOOD]', (done) => {
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

    step('T3: POST/api/huts [name NOT VALID]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .send({
                "name": 123,
                "city": "Turin",
                "province": "TO",
                "country": "Italy",
                "address": "Hut route 66",
                "altitude": 1950 ,
                "description": "Amazing hut in the middle of the mountains",
                "beds_number": 10,
                "latitude": 15.7,
                "longitude": 45.4,
                "phone_number" : "+393331171111",
                "email" : "hut@hut.it",
                "website" : "www.hut.com",
                "type" : "alpine_hut"
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('T4: POST/api/huts [city NOT VALID]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .send({
                "name": "Hut test",
                "city": 123,
                "province": "TO",
                "country": "Italy",
                "address": "Hut route 66",
                "altitude": 1950 ,
                "description": "Amazing hut in the middle of the mountains",
                "beds_number": 10,
                "latitude": 15.7,
                "longitude": 45.4,
                "phone_number" : "+393331171111",
                "email" : "hut@hut.it",
                "website" : "www.hut.com",
                "type" : "alpine_hut"
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('T5: POST/api/huts [province NOT VALID]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .send({
                "name": "Hut test",
                "city": "Turin",
                "province": 123,
                "country": "Italy",
                "address": "Hut route 66",
                "altitude": 1950 ,
                "description": "Amazing hut in the middle of the mountains",
                "beds_number": 10,
                "latitude": 15.7,
                "longitude": 45.4,
                "phone_number" : "+393331171111",
                "email" : "hut@hut.it",
                "website" : "www.hut.com",
                "type" : "alpine_hut"
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('T6: POST/api/huts [country NOT VALID]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .send({
                "name": "Hut test",
                "city": "Turin",
                "province": "TO",
                "country": 123,
                "address": "Hut route 66",
                "altitude": 1950 ,
                "description": "Amazing hut in the middle of the mountains",
                "beds_number": 10,
                "latitude": 15.7,
                "longitude": 45.4,
                "phone_number" : "+393331171111",
                "email" : "hut@hut.it",
                "website" : "www.hut.com",
                "type" : "alpine_hut"
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('T7: POST/api/huts [altitude NOT VALID]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .send({
                "name": "Hut test",
                "city": "Turin",
                "province": "TO",
                "country": "Italy",
                "address": "Hut route 66",
                "altitude": "hello" ,
                "description": "Amazing hut in the middle of the mountains",
                "beds_number": 10,
                "latitude": 15.7,
                "longitude": 45.4,
                "phone_number" : "+393331171111",
                "email" : "hut@hut.it",
                "website" : "www.hut.com",
                "type" : "alpine_hut"
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });
    step('T8: POST/api/huts [description NOT VALID]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .send({
                "name": "Hut test",
                "city": "Turin",
                "province": "TO",
                "country": "Italy",
                "address": "Hut route 66",
                "altitude": 1950 ,
                "description": 123,
                "beds_number": 10,
                "latitude": 15.7,
                "longitude": 45.4,
                "phone_number" : "+393331171111",
                "email" : "hut@hut.it",
                "website" : "www.hut.com",
                "type" : "alpine_hut"
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });
    step('T9: POST/api/huts [beds_number NOT VALID]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .send({
                "name": "Hut test",
                "city": "Turin",
                "province": "TO",
                "country": "Italy",
                "address": "Hut route 66",
                "altitude": 1950 ,
                "description": "Amazing hut in the middle of the mountains",
                "beds_number": "hello",
                "latitude": 15.7,
                "longitude": 45.4,
                "phone_number" : "+393331171111",
                "email" : "hut@hut.it",
                "website" : "www.hut.com",
                "type" : "alpine_hut"
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });
    step('T10: POST/api/huts [latitude NOT VALID]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .send({
                "name": "Hut test",
                "city": "Turin",
                "province": "TO",
                "country": "Italy",
                "address": "Hut route 66",
                "altitude": 1950 ,
                "description": "Amazing hut in the middle of the mountains",
                "beds_number": 10,
                "latitude": "hello",
                "longitude": 45.4,
                "phone_number" : "+393331171111",
                "email" : "hut@hut.it",
                "website" : "www.hut.com",
                "type" : "alpine_hut"
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });
    step('T11: POST/api/huts [longitude NOT VALID]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .send({
                "name": "Hut test",
                "city": "Turin",
                "province": "TO",
                "country": "Italy",
                "address": "Hut route 66",
                "altitude": 1950 ,
                "description": "Amazing hut in the middle of the mountains",
                "beds_number": 10,
                "latitude": 15.7,
                "longitude": "hello",
                "phone_number" : "+393331171111",
                "email" : "hut@hut.it",
                "website" : "www.hut.com",
                "type" : "alpine_hut"
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('T12: POST/api/huts [phone_number NOT VALID]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .send({
                "name": "Hut test",
                "city": "Turin",
                "province": "TO",
                "country": "Italy",
                "address": "Hut route 66",
                "altitude": 1950 ,
                "description": "Amazing hut in the middle of the mountains",
                "beds_number": 10,
                "latitude": 15.7,
                "longitude": 45.4,
                "phone_number" : "",
                "email" : "hut@hut.it",
                "website" : "www.hut.com",
                "type" : "alpine_hut"
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('T13: POST/api/huts [email NOT VALID]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .send({
                "name": "Hut test",
                "city": "Turin",
                "province": "TO",
                "country": "Italy",
                "address": "Hut route 66",
                "altitude": 1950 ,
                "description": "Amazing hut in the middle of the mountains",
                "beds_number": 10,
                "latitude": 15.7,
                "longitude": 45.4,
                "phone_number" : "+393331171111",
                "email" : "hello",
                "website" : "www.hut.com",
                "type" : "alpine_hut"
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('T14: POST/api/huts [website NOT VALID]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .send({
                "name": "Hut test",
                "city": "Turin",
                "province": "TO",
                "country": "Italy",
                "address": "Hut route 66",
                "altitude": 1950 ,
                "description": "Amazing hut in the middle of the mountains",
                "beds_number": 10,
                "latitude": 15.7,
                "longitude": 45.4,
                "phone_number" : "+393331171111",
                "email" : "hut@hut.it",
                "website" : 123,
                "type" : "alpine_hut"
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('T15: POST/api/huts [type NOT VALID]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .send({
                "name": "Hut test",
                "city": "Turin",
                "province": "TO",
                "country": "Italy",
                "address": "Hut route 66",
                "altitude": 1950 ,
                "description": "Amazing hut in the middle of the mountains",
                "beds_number": 10,
                "latitude": 15.7,
                "longitude": 45.4,
                "phone_number" : "+393331171111",
                "email" : "hut@hut.it",
                "website" : "www.hut.com",
                "type" : "alpine"
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('T16: POST/api/huts [HUT ALREADY EXISTS]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .send({
                "name": "Hut test",
                "city": "Angrogna",
                "province": "Torino",
                "country": "Italy",
                "address": "Barfè Superiore, 197, 10060 ",
                "altitude": 1950 ,
                "description": "Amazing hut in the middle of the mountains",
                "beds_number": 10,
                "latitude": 15.7,
                "longitude": 45.4,
                "phone_number" : "+393331171111",
                "email" : "hut@hut.it",
                "website" : "www.hut.com",
                "type" : "alpine_hut"
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });
});

describe('test Add hut good', () => {

    let authenticatedUser = request.agent(server);

    step('T1 login [GOOD]', (done) => {
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

    step('T2: POST/api/huts [GOOD]', async function () {
        await authenticatedUser
            .post('/api/hikes')
            .send({
                "name": "Hut test",
                "city": "Turin",
                "province": "TO",
                "country": "Italy",
                "address": "Hut route 66",
                "altitude": 1950 ,
                "description": "Amazing hut in the middle of the mountains",
                "beds_number": 10,
                "latitude": 15.7,
                "longitude": 45.4,
                "phone_number" : "+393331171111",
                "email" : "hut@hut.it",
                "website" : "www.hut.com",
                "type" : "alpine_hut"
              })
            .then(function (res) {
                res.should.have.status(200);
            });
    });    

});