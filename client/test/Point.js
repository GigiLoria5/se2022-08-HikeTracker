

'use strict'
/**
 * @jest-environment-node
 */

const assert = require('assert');
const {getPointShortDescription} = require('../src/Utils/Point.js')
const expect = require('chai').expect;

const elevations = require('./elevations.json')

describe('Point test', () =>{
    const point_hut = {
        name: "Hut Name",
        address: "TestA",
        city: "TestB",
        country: "TestC"
    }

    const point_parking = {
        address: "TestA",
        city: "TestB",
        country: "TestC"
    }

    const point_name = {
        value_type: "name",
        value: "Point Name",
        description: "Point Description"
    }

    const point_address = {
        value_type: "address",
        value: "Point Address",
        description: "Point Description"
    }

    const point_gps = {
        value_type: "gps",
        description: "Point Description"
    }

    const invalid_point = {
        value_type: "null",
        description: "Point Description"
    }

    it('T0: invalid point type', async () => {
        const res = getPointShortDescription("wrong", point_gps)
        expect(res).to.equal("Point type not present");
    })

    it('T1: null point type', async () => {
        const res = getPointShortDescription(null, point_gps)
        expect(res).to.equal("Point type not present");
    })

    it('T2: hut point', async () => {
        const res = getPointShortDescription("hut", point_hut)
        expect(res).to.equal("Hut Name at TestA TestB, TestC");
    })

    it('T3: parking lot point', async () => {
        const res = getPointShortDescription("parking_lot", point_parking)
        expect(res).to.equal("Parking lot at TestA TestB, TestC");
    })

    it('T4: name point', async () => {
        const res = getPointShortDescription("location", point_name)
        expect(res).to.equal("Point Name - Point Description");
    })

    it('T5: address point', async () => {
        const res = getPointShortDescription("location", point_address)
        expect(res).to.equal("Point Description at Point Address");
    })

    it('T6: gps', async () => {
        const res = getPointShortDescription("location", point_gps)
        expect(res).to.equal("Point Description");
    })

    it('T7: invalid location', async () => {
        const res = getPointShortDescription("location", invalid_point)
        expect(res).to.equal("Location type not present");
    })
})