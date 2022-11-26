

'use strict'
/**
 * @jest-environment-node
 */

const assert = require('assert');
const {parseGPX} = require('../src/Utils/GPX.js')
const expect = require('chai').expect;
const fs = require('fs')

const elevations = require('./elevations.json')

describe('GPX test', () =>{
    let dummyGPX = null;

    before('test1', function (done) {
        fs.readFile('./test/testgpx.gpx', 'utf8', (err, data) => {
          if (err) throw err;
          dummyGPX = data;
          dummyGPX = {val:null};
          dummyGPX.text = () => {return data};
          done();
        });
      });
    
    it('T0: gpx exist', async () => {
        const gpx = await parseGPX(dummyGPX)
        expect(gpx.length).not.to.be.undefined;
        expect(gpx.start_point_lat).not.to.be.undefined;
        expect(gpx.start_point_lon).not.to.be.undefined;
        expect(gpx.end_point_lat).not.to.be.undefined;
        expect(gpx.end_point_lon).not.to.be.undefined;
        expect(gpx.ascent).not.to.be.undefined;
        expect(gpx.peak_altitude).not.to.be.undefined;
        expect(gpx.expectedTime).not.to.be.undefined;
    })

    it('T1: ascent is correct', async () => {
        const gpx = await parseGPX(dummyGPX);
        let el = 0;
        let e_old = elevations[0];
        for(const e of elevations){
            if(e > e_old){
                el += e - e_old;
            }
            e_old = e;
        }
        expect(gpx.ascent).to.equal(Math.floor(el));
    })
    it('T2: length is correct', async () => {
        const gpx = await parseGPX(dummyGPX);
        expect(Math.floor(gpx.length)).to.equal(11);
    })
    it('T3: peak altitude is correct', async () => {
        const gpx = await parseGPX(dummyGPX);
        const peak_altitude = elevations.reduce((a,b) => {
            if(a>b) return a;
            else return b;
        })
        expect(gpx.peak_altitude).to.equal(Math.floor(peak_altitude));
    })
    it('T4: start_point is correct', async () => {
        const gpx = await parseGPX(dummyGPX);
        expect(gpx.start_point_lat).to.equal(44.574250867590308);
        expect(gpx.start_point_lon).to.equal(6.982689192518592);
    })
    it('T5: end_point is correct', async () => {
        const gpx = await parseGPX(dummyGPX);
        expect(gpx.end_point_lat).to.equal(44.574263943359256);
        expect(gpx.end_point_lon).to.equal(6.982647031545639);
    })
    it('T6: expected time is correct', async () => {
        const gpx = await parseGPX(dummyGPX);
        const t1 = Date.parse("2022-02-20T07:36:55Z");
        const t2 = Date.parse("2022-02-20T12:53:32Z");
        expect(gpx.expectedTime).to.equal(parseFloat(((t2-t1)/3600000).toFixed(2)));
    })
})