

'use strict'
/**
 * @jest-environment-node
 */

const assert = require('assert');
const { timeToHHMM } = require('../src/Utils/TimeUtils');
const expect = require('chai').expect;

const elevations = require('./elevations.json')

describe('Time Format test', () => {
    it('T0: time check 12:00', async () => {
        const res = timeToHHMM(12.0);
        expect(res).to.equal("12:0");
    })

    it('T1: time check 12:30', async () => {
        const res = timeToHHMM(12.5);
        expect(res).to.equal("12:30");
    })

    it('T1: time check 12:59', async () => {
        const res = timeToHHMM(12.99);
        expect(res).to.equal("12:59");
    })

})