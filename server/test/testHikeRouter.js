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
    step('T1: GET/api/countries', async function() {
        await agent.get('/api/countries')
                    .then(function(res) {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        countries = res.body;
                    });
    });

    step('T2: GET/api/provinces', async function() {
        for (const c of countries){
            await agent.get('/api/provinces/'+c.country)
            .then(function(res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                for (const p of res.body){
                    provinces.push(p);
                }
            });
        }
    });

    step('T3: GET/api/cities', async function() {
        for (const p of provinces){
            await agent.get('/api/cities/'+p.province)
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
                        "&track_length=" + null +
                        "&ascent=" + null +
                        "&expected_time=" + null)
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
        await agent.get('/api/hikes/filters?track_length=' + "5-15")
        .then(function(res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            for(const b of res.body){
                expect(b.track_length).to.be.below(16);
                expect(b.track_length).to.be.above(4);
            }
        });
    });

    step('T9: GET/api/hikes/filter [BAD track_length]', async function() {
        await agent.get('/api/hikes/filters?track_length=' + "27")
        .then(function(res) {
            res.should.have.status(400);
        });
    });

    step('T10: GET/api/hikes/filter [ascent]', async function() {
        await agent.get('/api/hikes/filters?ascent=' + "600-1000")
        .then(function(res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            for(const b of res.body){
                expect(b.ascent).to.be.below(1001);
                expect(b.ascent).to.be.above(599);
            }
        });
    });

    step('T11: GET/api/hikes/filter [BAD ascent]', async function() {
        await agent.get('/api/hikes/filters?ascent=' + "620-1000")
        .then(function(res) {
            res.should.have.status(400);
        });
    });

    step('T10: GET/api/hikes/filter [expected time]', async function() {
        await agent.get('/api/hikes/filters?expected_time=' + "1-3")
        .then(function(res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            for(const b of res.body){
                expect(b.expected_time).to.be.below(4);
                expect(b.expected_time).to.be.above(0);
            }
        });
    });

    step('T11: GET/api/hikes/filter [BAD expected time]', async function() {
        await agent.get('/api/hikes/filters?expected_time=' + "24")
        .then(function(res) {
            res.should.have.status(400);
        });
    });
});