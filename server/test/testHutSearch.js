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

describe('test get hut WRONG ROLE',()=>{

    step('T0 login [GOOD BUT WRONG ROLE]', (done) => {
        authenticatedUser
            .post('/api/sessions')
            .send({
                "username": "nauouejwvrmthcavxq@tmmwj.com",
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

    step('T4: GET/api/huts/filters [WRONG USER ROLE]', async function() {
        await authenticatedUser
        .get('/api/huts/filters?')
        .then(function(res) {
            res.should.have.status(401);
        });
    });

    step('T5: GET/api/hut/:id [WRONG USER ROLE]', async function () {
        await authenticatedUser
        .get('/api/hut/1')
            .then(function (res) {
                res.should.have.status(401);
            });
    });

    
});

describe('test get hut provinces, cities MISSING/BAD PARAMETERS',()=>{
    step('T0 login [GOOD LOGIN GOOD ROLE]', (done) => {
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

    step('T1: GET/api/huts/provinces [WRONG COUNTRY]', async function () {
        await authenticatedUser
            .get('/api/huts/provinces/')
            .then(function (res) {
                res.should.have.status(404);
            });
    });

    step('T1: GET/api/huts/provinces [WRONG COUNTRY TYPE]', async function () {
        await authenticatedUser
            .get('/api/huts/provinces/5')
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('T3: GET/api/huts/cities [WRONG CITY]', async function () {
        await authenticatedUser
            .get('/api/huts/cities/')
            .then(function (res) {
                res.should.have.status(404);
            });
    });

    step('T3: GET/api/huts/cities [WRONG CITY TYPE]', async function () {
        await authenticatedUser
            .get('/api/huts/cities/5')
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('T4: GET/api/huts/filter [BAD PARAMETERS]', async function() {
        await authenticatedUser
        .get('/api/huts/filters?city=' + null + 
                        "&province=" + null + 
                        "&country=" + null + 
                        "&altitude_min=" + null +
                        "&altitude_max=" + null +
                        "&track_length_max=" + null +
                        "&beds_number_min=" + null +
                        "&beds_number_max=" + null +
                        "&hut_type=" + null)
        .then(function(res) {
            res.should.have.status(422);
        });
    });

    step('T4: GET/api/huts/filter [BAD ALTITUDE RANGES]', async function() {
        await authenticatedUser
        .get('/api/huts/filters?altitude_min=' + 10 +
                        "&altitude_max=" + -10)
        .then(function(res) {
            res.should.have.status(422);
        });
    });

    step('T5: GET/api/huts/filter [BAD BEDS_NUMBER RANGES]', async function() {
        await authenticatedUser
        .get('/api/huts/filters?beds_number_min=' + -10 +
                        "&beds_number_max=" + 10)
        .then(function(res) {
            res.should.have.status(422);
        });
    });

    step('T4: GET/api/huts/filter [BAD HUT TYPE]', async function() {
        await authenticatedUser
        .get('/api/huts/filters?hut_type=' + "wrong_hut_type")
        .then(function(res) {
            res.should.have.status(422);
        });
    });

    step('T4: GET/api/huts/filter [BAD HUT TYPE 2]', async function() {
        await authenticatedUser
        .get('/api/huts/filters?hut_type=' + "alpine_hut"+"&hut_type="+"wrong_hut_type")
        .then(function(res) {
            res.should.have.status(422);
        });
    });

    step('T6: GET/api/hut/:id [ID NOT VALID]', async function () {
        await authenticatedUser
        .get('/api/hut/8.5')
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('T6: GET/api/hut/:id [ID NOT VALID]', async function () {
        await authenticatedUser
        .get('/api/hut/hello')
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('T7: GET/api/hut/:id [MISSING ID PARAMETER]', async function () {
        await authenticatedUser
        .get('/api/hut/')
            .then(function (res) {
                res.should.have.status(404);
            });
    });


});

describe('test get hut GOOD',()=>{
    let countries;
    let provinces = [];
    let cities = [];
    let huts = [];

    step('T0 login [GOOD LOGIN GOOD ROLE ]', (done) => {
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

    step('T1: GET/api/huts/countries [GOOD]', async function () {
        await authenticatedUser
            .get('/api/huts/countries')
            .then(function (res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                countries = res.body;
            });
    });

    step('T2: GET/api/huts/provinces [GOOD]', async function () {
        for (const c of countries){
        await authenticatedUser
            .get('/api/huts/provinces/'+c.country)
            .then(function (res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                for (const p of res.body){
                    provinces.push(p);
                }
            });
        }
    });

    step('T3: GET/api/huts/cities [GOOD]', async function () {
        for (const p of provinces){
        await authenticatedUser
            .get('/api/huts/cities/'+p.province)
            .then(function (res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                for (const c of res.body){
                    cities.push(c);
                }
            });
        }
    });

    step('T5: GET/api/huts/filter [NO FILTERS]', async function() {
        await authenticatedUser
        .get('/api/huts/filters?')
        .then(function(res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            for (const h of res.body){
                huts.push(h);
            }
        });
    });


    step('T5: GET/api/huts/filter [HUT TYPE]', async function() {
        await authenticatedUser
        .get('/api/huts/filters?hut_type=alpine_hut')
        .then(function(res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            for(const b of res.body){
                expect(b.type).to.equal("alpine_hut");
            }
        });
    });

    step('T6: GET/api/huts/filter [CITIES]', async function() {
        for (const c of cities){
            await authenticatedUser
            .get('/api/huts/filters?city=' + c.city)
            .then(function(res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                for(const b of res.body){
                    expect(b.city).to.equal(c.city);
                }
            });
        }
    });

    step('T7: GET/api/huts/filter [PROVINCES]', async function() {
        for (const p of provinces){
            await authenticatedUser
            .get('/api/huts/filters?province=' + p.province)
            .then(function(res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                for(const b of res.body){
                    expect(b.province).to.equal(p.province);
                }
            });
        }
    });

    step('T8: GET/api/huts/filter [COUNTRIES]', async function() {
        for (const c of countries){
            await authenticatedUser
            .get('/api/huts/filters?country=' + c.country)
            .then(function(res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                for(const b of res.body){
                    expect(b.country).to.equal(c.country);
                }
            });
        }
    });


    step('T1: GET/api/hut/:id [GOOD]', async function () {
        for (const h of huts){
            await authenticatedUser
            .get('/api/hut/'+h.id)
                .then(function (res) {
                    res.should.have.status(200);
                    for(const key in h)
                    expect(res.body[key]).to.eql(h[key]);
                });
        }

    });

    step('T5: GET/api/huts/filter [ALTITUDE RANGES]', async function() {
        for (const h of huts){
        await authenticatedUser
        .get('/api/huts/filters?altitude_min=' + 0 +
        "&altitude_max=" + h.altitude)
        .then(function(res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            for(const b of res.body){
                expect(b.altitude).to.greaterThanOrEqual(0);
                expect(b.altitude).to.lessThanOrEqual(h.altitude);
            }
        });
    }
    });

    step('T5: GET/api/huts/filter [BEDS RANGES]', async function() {
        for (const h of huts){
        await authenticatedUser
        .get('/api/huts/filters?beds_number_min=' + 0 +
        "&beds_number_max=" + h.beds_number)
        .then(function(res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            for(const b of res.body){
                expect(b.beds_number).to.greaterThanOrEqual(0);
                expect(b.beds_number).to.lessThanOrEqual(h.beds_number);
            }
        });
    }
    });

    step('T5: GET/api/huts/filter [BEDS RANGES MIN=MAX=0]', async function() {
        for (const h of huts){
        await authenticatedUser
        .get('/api/huts/filters?beds_number_min=' + 0 +
        "&beds_number_max=" + 0)
        .then(function(res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            for(const b of res.body){
                expect(b.beds_number).to.equal(0);
            }
        });
    }
    });
    
    step('T5: GET/api/huts/filter [HUT TYPE 2]', async function() {
        await authenticatedUser
        .get('/api/huts/filters?hut_type=alpine_hut'+"&hut_type=fixed_bivouac")
        .then(function(res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            for(const b of res.body){
                if(b.type==="alpine_hut"){
                    expect(b.type).to.equal("alpine_hut");
                }else{
                    expect(b.type).to.equal("fixed_bivouac");
                }
            }
        });
    });
});
