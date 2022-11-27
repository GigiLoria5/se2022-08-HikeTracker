

'use strict'
/**
 * @jest-environment node
 */


import API from '../API.js';

const APIURL = 'http://localhost:3001';
//const fetch = require('node-fetch');

describe('frontend test', () => {
    let countries;
    let provinces = [];
    let cities = [];
    let hike_id = 1;

    const filterNull = {
        "country": null, "province": null, "city": null, "difficulty": null,
        "track_length_min": null, "track_length_max": null,
        "ascent_min": null, "ascent_max": null,
        "expected_time_min": null, "expected_time_max": null
    };


    it('T0: get country test', async () => {
        const a = await API.getCountries();
        expect(a).toBeInstanceOf(Array);
        for (const c of a) {
            expect(typeof c.country).toBe('string');
            expect(c.country.length).toBeGreaterThan(0);
        }
        countries = a;
    })

    it('T1: get provinces test', async () => {
        for (const c of countries) {
            const a = await API.getProvincesByCountry(c.country);
            expect(a).toBeInstanceOf(Array);
            for (const p of a) {
                expect(typeof p.province).toBe('string');
                expect(p.province.length).toBeGreaterThan(0);
            }
            provinces.push(...a);
        }
    })

    it('T2: get cities test', async () => {
        for (const p of provinces) {
            const a = await API.getCitiesByProvince(p.province);
            expect(a).toBeInstanceOf(Array);
            for (const c of a) {
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
        const a = await API.getHikesWithFilters({ ...filterNull });
        expect(a).toBeInstanceOf(Array);
        for (const h of a) {
            expect(countries.map(a => a.country).includes(h.country)).toBe(true);
            expect(provinces.map(a => a.province).includes(h.province)).toBe(true);
            expect(cities.map(a => a.city).includes(h.city)).toBe(true);
            expect(typeof h.difficulty).toBe('number');
            expect(h.difficulty).toBeGreaterThanOrEqual(1);
            expect(h.difficulty).toBeLessThanOrEqual(3);
            expect(typeof h.ascent).toBe('number');
            expect(typeof h.track_length).toBe('number');
            expect(typeof h.expected_time).toBe('number');
        }
    })

    it('T6: get hikes with country filter', async () => {
        let filter = { ...filterNull }

        for (const c of countries) {
            filter.country = c.country;
            const a = await API.getHikesWithFilters(filter);
            for (const h of a) {
                expect(h.country).toBe(c.country);
            }
        }
    })

    it('T7: get hikes with province filter', async () => {
        let filter = { ...filterNull }

        for (const p of provinces) {
            filter.province = p.province;
            const a = await API.getHikesWithFilters(filter);
            for (const h of a) {
                expect(h.province).toBe(p.province);
            }
        }
    })

    it('T8: get hikes with city filter', async () => {
        let filter = { ...filterNull }

        for (const c of cities) {
            filter.city = c.city;
            const a = await API.getHikesWithFilters(filter);
            for (const h of a) {
                expect(h.city).toBe(c.city);
            }
        }
    })

    it('T9: get hikes with difficulty filter', async () => {
        for (const n of [1, 2, 3]) {
            const a = await API.getHikesWithFilters({ ...filterNull, "difficulty": n });
            for (const h of a) {
                expect(h.difficulty).toBe(n);
            }
        }
    })

    it('T10: get hikes with track length filter [BAD]', async () => {
        try {
            await API.getHikesWithFilters({ ...filterNull, "track_length_min": 0, "track_length_max": -1 });
        }
        catch (err) {
            expect(err.error).toBe("Parameter error");
        }
    })

    it('T11: get hikes with track length filter [BAD]', async () => {
        try {
            await API.getHikesWithFilters({ ...filterNull, "track_length_min": -1, "track_length_max": -1 });
        }
        catch (err) {
            expect(err.error).toBe("Parameter error");
        }
    })

    it('T12: get hikes with difficulty filter [BAD]', async () => {
        try {
            await API.getHikesWithFilters({ ...filterNull, "difficulty": 0 });
        }
        catch (err) {
            expect(err.error).toBe("Parameter error");
        }
    })

    it('T13: get hikes with difficulty filter [BAD]', async () => {
        try {
            await API.getHikesWithFilters({ ...filterNull, "difficulty": 4 });
        }
        catch (err) {
            expect(err.error).toBe("Parameter error");
        }
    })

    it('T14: get hikes with difficulty filter [BAD]', async () => {
        try {
            await API.getHikesWithFilters({ ...filterNull, "difficulty": -1 });
        }
        catch (err) {
            expect(err.error).toBe("Parameter error");
        }
    })

    it('T15: get hikes with ascent filter', async () => {
        const a = await API.getHikesWithFilters({ ...filterNull, "ascent_min": 0, "ascent_max": 300 });
        for (const h of a) {
            expect(h.ascent).toBeGreaterThanOrEqual(0);
            expect(h.ascent).toBeLessThanOrEqual(300);
        }

        const b = await API.getHikesWithFilters({ ...filterNull, "ascent_min": 300, "ascent_max": 600 });
        for (const h of b) {
            expect(h.ascent).toBeGreaterThanOrEqual(300);
            expect(h.ascent).toBeLessThanOrEqual(600);
        }

        const c = await API.getHikesWithFilters({ ...filterNull, "ascent_min": 600, "ascent_max": 1000 });
        for (const h of c) {
            expect(h.ascent).toBeGreaterThanOrEqual(600);
            expect(h.ascent).toBeLessThanOrEqual(1000);
        }

        const d = await API.getHikesWithFilters({ ...filterNull, "ascent_min": 1000, "ascent_max": Number.MAX_VALUE });
        for (const h of d) {
            expect(h.ascent).toBeGreaterThanOrEqual(1000);
        }
    })

    it('T16: get hikes with ascent filter [BAD]', async () => {
        try {
            await API.getHikesWithFilters({ ...filterNull, "ascent_min": -1.0, "ascent_max": -1 });
        }
        catch (err) {
            expect(err.error).toBe("Parameter error");
        }
    })

    it('T17: get hikes with expected time filter', async () => {

        const b = await API.getHikesWithFilters({ ...filterNull, "expected_time_min": 1, "expected_time_max": 3 });
        for (const h of b) {
            expect(h.expected_time).toBeGreaterThanOrEqual(1);
            expect(h.expected_time).toBeLessThanOrEqual(3);
        }

        const c = await API.getHikesWithFilters({ ...filterNull, "expected_time_min": 3, "expected_time_max": 5 });
        for (const h of c) {
            expect(h.expected_time).toBeGreaterThanOrEqual(3);
            expect(h.expected_time).toBeLessThanOrEqual(5);
        }

        const d = await API.getHikesWithFilters({ ...filterNull, "expected_time_min": 5, "expected_time_max": Number.MAX_VALUE });
        for (const h of d) {
            expect(h.expected_time).toBeGreaterThanOrEqual(5);
        }
    })

    it('T18: get hikes with expected time filter [BAD]', async () => {
        try {
            await API.getHikesWithFilters({ ...filterNull, "expected_time_min": -1, "expected_time_max": -1 });
        }
        catch (err) {
            expect(err.error).toBe("Parameter error");
        }
    })

    it('T19: get hikes by its id [GOOD]', async () => {
        const a = await API.getHikeById(hike_id);
        expect(a.id).toBe(hike_id);
    })

    it('T19: get hikes by its id but there is not id [BAD]', async () => {
        try {
            await API.getHikeById();
        }
        catch (err) {
            expect(err.error).toBe("Fields validation failed");
        }
    })

    it('T20: get hikes by its id but there is a wrong id [BAD]', async () => {
        try {
            await API.getHikeById(8.5);
        }
        catch (err) {
            expect(err.error).toBe("Fields validation failed");
        }
    })
})