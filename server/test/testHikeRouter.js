/* IMPORTS */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { step } = require('mocha-steps');
chai.use(chaiHttp);
chai.should();
const app = require('../index.js');
let agent = chai.request.agent(app);
const expect = chai.expect;

describe('test HikeAPI',()=>{
    let countries;
    let provinces = [];
    let cities = [];
    step('T1: GET/api/hikes/countries', async function() {
        await agent.get('/api/hikes/countries')
                    .then(function(res) {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        countries = res.body;
                    });
    });

    step('T2: GET/api/hikes/provinces', async function() {
        for (const c of countries){
            await agent.get('/api/hikes/provinces/'+c.country)
            .then(function(res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                for (const p of res.body){
                    provinces.push(p);
                }
            });
        }
    });

    step('T3: GET/api/hikes/cities', async function() {
        for (const p of provinces){
            await agent.get('/api/ikes/cities/'+p.province)
            .then(function(res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                for (const c of res.body){
                    cities.push(c);
                }
            });
        }
    });

    step('T4: GET/api/hikes/filter [BAD]', async function() {
        await agent.get('/api/hikes/filters?city=' + null + 
                        "&province=" + null + 
                        "&country=" + null + 
                        "&difficulty=" + null +
                        "&track_length_min=" + null +
                        "&track_length_max=" + null +
                        "&ascent_min=" + null +
                        "&ascent_max=" + null +
                        "&expected_time_min=" + null + 
                        "&expected_time_max=" + null)
        .then(function(res) {
            res.should.have.status(400);
        });
    });

    step('T5: GET/api/hikes/filter [no filters]', async function() {
        await agent.get('/api/hikes/filters?')
        .then(function(res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
        });
    });

    step('T6: GET/api/hikes/filter [cities]', async function() {
        for (const c of cities){
            await agent.get('/api/hikes/filters?city=' + c.city)
            .then(function(res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                for(const b of res.body){
                    expect(b.city).to.equal(c.city);
                }
            });
        }
    });

    step('T7: GET/api/hikes/filter [provinces]', async function() {
        for (const p of provinces){
            await agent.get('/api/hikes/filters?province=' + p.province)
            .then(function(res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                for(const b of res.body){
                    expect(b.province).to.equal(p.province);
                }
            });
        }
    });

    step('T8: GET/api/hikes/filter [countries]', async function() {
        for (const c of countries){
            await agent.get('/api/hikes/filters?country=' + c.country)
            .then(function(res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                for(const b of res.body){
                    expect(b.country).to.equal(c.country);
                }
            });
        }
    });

    step('T9: GET/api/hikes/filter [track_length]', async function() {
        await agent.get('/api/hikes/filters?track_length_min=' + 0.1 + "&track_length_max=" + 8.1)
        .then(function(res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            for(const b of res.body){
                expect(b.track_length).to.be.below(8.0);
                expect(b.track_length).to.be.above(0.0);
            }
        });
    });

    step('T9: GET/api/hikes/filter [BAD track_length]', async function() {
        await agent.get('/api/hikes/filters?track_length_min=' + -34 + "&track_length_max=" + -20)
        .then(function(res) {
            res.should.have.status(400);
        });
    });

    step('T10: GET/api/hikes/filter [ascent]', async function() {
        await agent.get('/api/hikes/filters?ascent_min='+ 300 +'&ascent_max=' + 1000)
        .then(function(res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            for(const b of res.body){
                expect(b.ascent).to.be.below(1001);
                expect(b.ascent).to.be.above(299);
            }
        });
    });

    step('T11: GET/api/hikes/filter [BAD ascent]', async function() {
        await agent.get('/api/hikes/filters?ascent_min='+ -3000 +'&ascent_max=' + -1000)
        .then(function(res) {
            res.should.have.status(400);
        });
    });

    step('T10: GET/api/hikes/filter [expected time]', async function() {
        await agent.get('/api/hikes/filters?expected_time_min=' + 2.0 + '&expected_time_max=' + 5.0)
        .then(function(res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            for(const b of res.body){
                expect(b.expected_time).to.be.below(5.1);
                expect(b.expected_time).to.be.above(1.9);
            }
        });
    });

    step('T11: GET/api/hikes/filter [BAD expected time]', async function() {
        await agent.get('/api/hikes/filters?expected_time_min=' + -4.0 + '&expected_time_max=' + -2.0)
        .then(function(res) {
            res.should.have.status(400);
        });
    });
});