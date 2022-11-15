

'use strict'
/**
 * @jest-environment node
 */


import API from './API.js';

const APIURL = 'http://localhost:3001';
//const fetch = require('node-fetch');

describe('frontend test', () =>{
    let countries;
    let provinces = [];
    let cities = [];

    it('T0: get country test', async () => {
        const a = await API.getCountries();
        expect(a).toBeInstanceOf(Array);
        countries = a;
    })

    it('T1: get provinces test', async () => {
        for(const c of countries){
            const a = await API.getProvincesByCountry(c.country);
            expect(a).toBeInstanceOf(Array);
            provinces.push(...a);
        }
    })

    it('T2: get cities test', async () => {
        for(const p of provinces){
            const a = await API.getCitiesByProvince(p.province);
            expect(a).toBeInstanceOf(Array);
            cities.push(...a);
        }
    })
})