

'use strict'
/**
 * @jest-environment-node
 */

const assert = require('assert');
const {isPointInsideRange, splitCoordinates, findFarthestPoint, getMidPoint, getClosestPoint} = require('../src/Utils/GeoUtils.js')
const expect = require('chai').expect;

const elevations = require('./elevations.json')

describe('GeoUtils test', () =>{
    const pointsList = [
        [0.0, 0.0],
        [0.1, 0.0],
        [0.2, 0.1],
        [0.3, 0.1],
        [0.4, 0.3],
        [0.5, 0.6],
        [0.7, 0.2],
        [0.2, 0.4],
        [0.1, 0.2],
        [0.0, 0.0]
    ]

    it('T0: get closest point [EQUAL LAT-LON]', async () => {
        const res = getClosestPoint([0.1, 0.0], pointsList)
        expect(res).not.to.be.undefined;
        expect(res[0]).not.to.be.undefined;
        expect(res[1]).not.to.be.undefined;
        expect(res[0]).to.equal(0.1);
        expect(res[1]).to.equal(0.0);
    })

    it('T1: get closest point [EQUAL LAT]', async () => {
        const res = getClosestPoint([0.4, 0.32], pointsList)
        expect(res).not.to.be.undefined;
        expect(res[0]).not.to.be.undefined;
        expect(res[1]).not.to.be.undefined;
        expect(res[0]).to.equal(0.4);
        expect(res[1]).to.equal(0.3);
    })

    it('T2: get closest point [EQUAL LON]', async () => {
        const res = getClosestPoint([0.41, 0.3], pointsList)
        expect(res).not.to.be.undefined;
        expect(res[0]).not.to.be.undefined;
        expect(res[1]).not.to.be.undefined;
        expect(res[0]).to.equal(0.4);
        expect(res[1]).to.equal(0.3);
    })

    it('T3: get closest point', async () => {
        const res = getClosestPoint([0.41, 0.32], pointsList)
        expect(res).not.to.be.undefined;
        expect(res[0]).not.to.be.undefined;
        expect(res[1]).not.to.be.undefined;
        expect(res[0]).to.equal(0.4);
        expect(res[1]).to.equal(0.3);
    })

    it('T4: get mid point', async () => {
        const res = getMidPoint([0.2, 0.3], [0.4, 0.5])
        expect(res).not.to.be.undefined;
        expect(res[0]).not.to.be.undefined;
        expect(res[1]).not.to.be.undefined;
        expect(res[0].toFixed(1)).to.equal("0.3");
        expect(res[1].toFixed(1)).to.equal("0.4");
    })

    it('T5: get farthest point', async () => {
        const res = findFarthestPoint([0.0, 0.0], pointsList);
        expect(res).not.to.be.undefined;
        expect(res[0]).not.to.be.undefined;
        expect(res[1]).not.to.be.undefined;
        expect(res[0]).to.equal(0.5);
        expect(res[1]).to.equal(0.6);
    })

    it('T6: test split coordinates [NO SPACE]', async () => {
        const res = splitCoordinates("1.0,2.0");
        expect(res).not.to.be.undefined;
        expect(res[0]).not.to.be.undefined;
        expect(res[1]).not.to.be.undefined;
        expect(res[0]).to.equal("1.0");
        expect(res[1]).to.equal("2.0");
    })

    it('T7: test split coordinates [SPACE]', async () => {
        const res = splitCoordinates("1.0, 2.0");
        expect(res).not.to.be.undefined;
        expect(res[0]).not.to.be.undefined;
        expect(res[1]).not.to.be.undefined;
        expect(res[0]).to.equal("1.0");
        expect(res[1]).to.equal("2.0");
    })

    it('T8: test point range [OUTSIDE]', async () => {
        const res = isPointInsideRange({latitude:1.0, longitude:0.0}, 1, {latitude:23.0, longitude:20.0});
        expect(res).not.to.be.undefined;
        expect(res).to.equal(false);
    })

    it('T9: test point range [INSIDE]', async () => {
        const res = isPointInsideRange({latitude:1.0, longitude:0.0}, 100, {latitude:1.00001, longitude:0.00002});
        expect(res).not.to.be.undefined;
        expect(res).to.equal(true);
    })

    it('T10: test point range [NO RADIUS]', async () => {
        const res = isPointInsideRange({latitude:1.0, longitude:0.0}, null, {latitude:1.001, longitude:0.002});
        expect(res).not.to.be.undefined;
        expect(res).to.equal(false);
    })

    it('T11: test point range [INVALID POINT ATTRIBUTES]', async () => {
        const res = isPointInsideRange({lat:1.0, long:0.0}, 1, {latitude:1.001, longitude:0.002});
        expect(res).not.to.be.undefined;
        expect(res).to.equal(false);
    })

    it('T12: test point range [INVALID POINT VALUES]', async () => {
        const res = isPointInsideRange({latitude:"1.0", longitude:null}, 1, {latitude:1.001, longitude:0.002});
        expect(res).not.to.be.undefined;
        expect(res).to.equal(false);
    })

})