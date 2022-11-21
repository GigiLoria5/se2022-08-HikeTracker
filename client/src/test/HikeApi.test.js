

'use strict'
/**
 * @jest-environment node
 */


import API from '../API.js';

const APIURL = 'http://localhost:3001';
//const fetch = require('node-fetch');

describe('frontend test', () =>{
    let countries;
    let provinces = [];
    let cities = [];

    it('T0: get country test', async () => {
        const a = await API.getCountries();
        expect(a).toBeInstanceOf(Array);
        for(const c of a){
            expect(typeof c.country).toBe('string');
            expect(c.country.length).toBeGreaterThan(0);
        }
        countries = a;
    })

    it('T1: get provinces test', async () => {
        for(const c of countries){
            const a = await API.getProvincesByCountry(c.country);
            expect(a).toBeInstanceOf(Array);
            for(const p of a){
                expect(typeof p.province).toBe('string');
                expect(p.province.length).toBeGreaterThan(0);
            }
            provinces.push(...a);
        }
    })

    it('T2: get cities test', async () => {
        for(const p of provinces){
            const a = await API.getCitiesByProvince(p.province);
            expect(a).toBeInstanceOf(Array);
            for(const c of a){
                expect(typeof c.city).toBe('string');
                expect(c.city.length).toBeGreaterThan(0);
            }
            cities.push(...a);
        }
    })

    it('T3: get provinces test [BAD]', async () => {
        const a = await API.getProvincesByCountry(null);
        expect(a).toBeInstanceOf(Array);
        expect(a.length).toBe(0);
    })

    it('T4: get cities test [BAD]', async () => {
        const a = await API.getCitiesByProvince(null);
        expect(a).toBeInstanceOf(Array);
        expect(a.length).toBe(0);
    })

    it('T5: get hikes with no filters', async () => {
        const a = await API.getHikesWithFilters(null, null, null, null, null, null, null);
        expect(a).toBeInstanceOf(Array);
        for(const h of a){
            expect(countries.map(a=>a.country).includes(h.country)).toBe(true);
            expect(provinces.map(a=>a.province).includes(h.province)).toBe(true);
            expect(cities.map(a=>a.city).includes(h.city)).toBe(true);
            expect(typeof h.difficulty).toBe('number');
            expect(h.difficulty).toBeGreaterThanOrEqual(1);
            expect(h.difficulty).toBeLessThanOrEqual(3);
            expect(typeof h.ascent).toBe('number');
            expect(typeof h.track_length).toBe('number');
            expect(typeof h.expected_time).toBe('number');
            //console.log(h);
        }
    })

    it('T6: get hikes with country filter', async () => {
        for (const c of countries){
            const a = await API.getHikesWithFilters(null, null, c.country, null, null, null, null);
            for(const h of a){
                expect(h.country).toBe(c.country);
            }
        }
    })

    it('T7: get hikes with province filter', async () => {
        for (const p of provinces){
            const a = await API.getHikesWithFilters(null, p.province, null, null, null, null, null);
            for(const h of a){
                expect(h.province).toBe(p.province);
            }
        }
    })

    it('T8: get hikes with city filter', async () => {
        for (const c of cities){
            const a = await API.getHikesWithFilters(c.city, null, null, null, null, null, null);
            for(const h of a){
                expect(h.city).toBe(c.city);
            }
        }
    })

    it('T9: get hikes with difficulty filter', async () => {
        for (const n of [1,2,3]){
            const a = await API.getHikesWithFilters(null, null, null, n, null, null, null);
            for(const h of a){
                expect(h.difficulty).toBe(n);
            }
        }
    })

    it('T10: get hikes with track length filter [BAD]', async () => {
        try{
            await API.getHikesWithFilters(null, null, null, null, 0, null, null);
        }
        catch (err){
            expect(err.error).toBe("Parameter error");
        }        
    })

    it('T11: get hikes with track length filter [BAD]', async () => {
        try{
            await API.getHikesWithFilters(null, null, null, null, -1, null, null);
        }
        catch (err){
            expect(err.error).toBe("Parameter error");
        }        
    })

    it('T12: get hikes with track length filter [BAD]', async () => {
        try{
            await API.getHikesWithFilters(null, null, null, null, 4, null, null);
        }
        catch (err){
            expect(err.error).toBe("Parameter error");
        }        
    })

    it('T13: get hikes with difficulty filter [BAD]', async () => {
        try{
            await API.getHikesWithFilters(null, null, null, 0, null, null, null);
        }
        catch (err){
            expect(err.error).toBe("Parameter error");
        }        
    })

    it('T14: get hikes with difficulty filter [BAD]', async () => {
        try{
            await API.getHikesWithFilters(null, null, null, 4, null, null, null);
        }
        catch (err){
            expect(err.error).toBe("Parameter error");
        }
    })

    it('T15: get hikes with difficulty filter [BAD]', async () => {
        try{
            await API.getHikesWithFilters(null, null, null, -1, null, null, null);
        }
        catch (err){
            expect(err.error).toBe("Parameter error");
        }
    })

    it('T16: get hikes with ascent filter', async () => {
        const a = await API.getHikesWithFilters(null, null, null, null, null, "0-300", null);
        for(const h of a){
            expect(h.ascent).toBeGreaterThanOrEqual(0);
            expect(h.ascent).toBeLessThanOrEqual(300);
        }

        const b = await API.getHikesWithFilters(null, null, null, null, null, "300-600", null);
        for(const h of b){
            expect(h.ascent).toBeGreaterThanOrEqual(300);
            expect(h.ascent).toBeLessThanOrEqual(600);
        }

        const c = await API.getHikesWithFilters(null, null, null, null, null, "600-1000", null);
        for(const h of c){
            expect(h.ascent).toBeGreaterThanOrEqual(600);
            expect(h.ascent).toBeLessThanOrEqual(1000);
        }

        const d = await API.getHikesWithFilters(null, null, null, null, null, "1000-more", null);
        for(const h of d){
            expect(h.ascent).toBeGreaterThanOrEqual(1000);
        }
    })

    it('T17: get hikes with ascent filter [BAD]', async () => {
        try{
            await API.getHikesWithFilters(null, null, null, null, null, "1-2", null);
        }
        catch (err){
            expect(err.error).toBe("Parameter error");
        }
    })

    it('T18: get hikes with expected time filter', async () => {

        const b = await API.getHikesWithFilters(null, null, null, null, null, null, "1-3");
        for(const h of b){
            expect(h.expected_time).toBeGreaterThanOrEqual(1);
            expect(h.expected_time).toBeLessThanOrEqual(3);
        }

        const c = await API.getHikesWithFilters(null, null, null, null, null,null,  "3-5");
        for(const h of c){
            expect(h.expected_time).toBeGreaterThanOrEqual(3);
            expect(h.expected_time).toBeLessThanOrEqual(5);
        }

        const d = await API.getHikesWithFilters(null, null, null, null, null, null, "5-more");
        for(const h of d){
            expect(h.expected_time).toBeGreaterThanOrEqual(5);
        }
    })

    it('T19: get hikes with expected time filter [BAD]', async () => {
        try{
            await API.getHikesWithFilters(null, null, null, null, null, null, "1-2");
        }
        catch (err){
            expect(err.error).toBe("Parameter error");
        }
    })
})