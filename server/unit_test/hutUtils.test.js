'use strict';

const { handleHutType, handleRangeFilters } = require('../utils/Utils_hut');

// TEST SUITE: HANDLE HUT TYPES
describe('handleHutTypeTests', () => {

    const huts = [{
        id: "3",
        name: "Rifugio Barfè",
        city: "Angrogna",
        province: "Turin",
        country: "Italy",
        address: "Barfè Superiore, 197, 10060 ",
        phone_number: "+393336277798",
        altitude: 1220,
        description: "The 'Rifugio Barfè' ...",
        beds_number: 30,
        opening_period: "Open on Saturday, Sunday and Holidays",
        coordinates: "44.850656, 7.191959",
        email: "rifugiobarfe@gmail.com",
        website: "www.facebook.com/rifugio.barfe",
        type: "alpine_hut",
        author_id: 6,
        author: "Luigi De Russis"
    }];

    describe('invalidCases', () => {
        test('T1: invalid hut type', () => {
            expect(handleHutType(huts, "wrong_type")).toBe(-1);
        });
        test('T2: invalid hut type into an array', () => {
            expect(handleHutType(huts, ["alpine_hut", "wrong_type"])).toBe(-1);
        });
        test('T3: hut type is an integer', () => {
            expect(handleHutType(huts, 4)).toBe(-1);
        });
    });

    describe('validCases', () => {
        test('T4: correct value of hut type', () => {
            expect(handleHutType(huts, "alpine_hut")).toStrictEqual(huts);
        });
        test('T5: correct array of hut types', () => {
            expect(handleHutType(huts, ["alpine_hut", "hiking_hut"])).toStrictEqual(huts);
        });
    });
});


// TEST SUITE: HANDLE RANGE FILTERS
describe('handleRangeFilters', () => {

    const huts = [{
        id: "3",
        name: "Rifugio Barfè",
        city: "Angrogna",
        province: "Turin",
        country: "Italy",
        address: "Barfè Superiore, 197, 10060 ",
        phone_number: "+393336277798",
        altitude: 1220,
        description: "The 'Rifugio Barfè' ...",
        beds_number: 30,
        opening_period: "Open on Saturday, Sunday and Holidays",
        coordinates: "44.850656, 7.191959",
        email: "rifugiobarfe@gmail.com",
        website: "www.facebook.com/rifugio.barfe",
        type: "alpine_hut",
        author_id: 6,
        author: "Luigi De Russis"
    }];

    describe('invalidCases', () => {

        test('T1: altitude min > altitude max', () => {
            expect(handleRangeFilters(huts, {
                altitude: [50, 40],
                beds_number: [10, 20]
            }))
                .toBe(-1);
        });
        test('T2: beds number min > beds number max', () => {
            expect(handleRangeFilters(huts, {
                altitude: [1200, 1300],
                beds_number: [20, 10]
            }))
                .toBe(-1);
        });
        test('T3: altitude min > altitude max (negative)', () => {
            expect(handleRangeFilters(huts, {
                altitude: [10, -20],
                beds_number: [10, 20]
            }))
                .toBe(-1);
        });
    });

    describe('validCases', () => {
        test('T1: Altitude filter', () => {
            expect(handleRangeFilters(huts, {
                altitude: [1200, 1300],
                beds_number: [undefined, undefined]
            }))
                .toStrictEqual(huts);
        });
        test('T2: beds number filter', () => {
            expect(handleRangeFilters(huts, {
                altitude: [undefined, undefined],
                beds_number: [20, 40]
            }))
                .toStrictEqual(huts);
        });
        test('T3: altitude and beds number filters', () => {
            expect(handleRangeFilters(huts, {
                altitude: [1200, 1300],
                beds_number: [20, 40]
            }))
                .toStrictEqual(huts);
        });
    });
});