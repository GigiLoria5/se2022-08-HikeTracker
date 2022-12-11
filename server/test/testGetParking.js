/* IMPORTS */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { step } = require('mocha-steps');
chai.use(chaiHttp);
chai.should();
const app = require('../index.js');
let agent = chai.request.agent(app);
const expect = chai.expect;

describe('test get all parking',()=>{

    step('T1: GET/api/parking', async function() {
        await agent.get('/api/parking')
                    .then(function(res) {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                    });
    });

});