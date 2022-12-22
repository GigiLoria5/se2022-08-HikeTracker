'use strict'
/**
 * @jest-environment node
 */

import API from '../API.js';
import { Hut } from '../Utils/Hut';
import { isPointInsideRange } from '../Utils/GeoUtils';
import { createMockFile } from '../Utils/File.js';

const APIURL = 'http://localhost:3001';

describe('frontend test: hut creation', () => {

    let h0 = new Hut({
        id: undefined,
        name: "Hut 0",
        city: "Turin",
        province: "TO",
        country: "Italy",
        address: "Corso Duca, 12",
        altitude: "200",
        description: "Description of the hut",
        beds_number: 12,
        opening_period: undefined,
        longitude: "12.3456",
        latitude: "65.4321",
        phone_number: "3456789012",
        email: "hut0@hut.it",
        website: "www.hut1.com",
        type: "hiking_hut",
        picture: createMockFile("image.jpg", 1024 * 1024 * 1 - 1, "image/jpeg")
    });

    let h1 = new Hut({
        id: undefined,
        name: "Hut 1",
        city: "Aosta",
        province: "AO",
        country: "Italy",
        address: "Via dei matti, 0",
        altitude: "42",
        description: "Era una casa molto carina",
        beds_number: 0,
        opening_period: undefined,
        longitude: "65.4321",
        latitude: "12.3456",
        phone_number: "3456789012",
        email: "hut0@hut.it",
        website: "",
        type: "unmanaged_hut",
        picture: createMockFile("image.jpg", 1024 * 1024 * 1 - 1, "image/png")
    });

    let h2 = new Hut({
        id: undefined,
        name: "Hut 2",
        city: "Turin",
        province: "TO",
        country: "Italy",
        address: "Corso Duca, 12",
        altitude: "200",
        description: "Description of the hut",
        beds_number: 12,
        opening_period: undefined,
        longitude: "12.3456",
        latitude: "65.4321",
        phone_number: "3456789012",
        email: "hut2@hut.it",
        website: "www.hut1.com",
        type: "",
        picture: createMockFile("image.jpg", 1024 * 1024 * 1 - 1, "image/png")
    });

    let h3 = new Hut({
        id: undefined,
        name: "Hut 3",
        city: "Turin",
        province: "TO",
        country: "Italy",
        address: "Corso Duca, 12",
        altitude: "200",
        description: "Description of the hut",
        beds_number: 12,
        opening_period: undefined,
        longitude: 12.3456,
        latitude: 65.4321,
        phone_number: "3456789012",
        email: "hut2@hut.it",
        website: "www.hut1.com",
        type: "hiking_hut",
        picture: createMockFile("image.jpg", 1024 * 1024 * 1 - 1, "image/jpeg")
    });

    it('setup', async () => {
        const user = await API.logIn({ username: "g.desantis@localguide.it", password: "password" });
    })

    it('T0: correct body', async () => {
        const res = await API.addHut(h0);
        expect(res).toBe(true);
    })

    it('T1: correct body without optional fields', async () => {
        const res = await API.addHut(h1);
        expect(res).toBe(true);
    })

    it('T2: missing mandatory field', async () => {
        try {
            await API.addHut(h2);
        }
        catch (err) {
            expect(err);
        }
    })

    it('T3: wrong-type field', async () => {
        try {
            await API.addHut(h3);
        }
        catch (err) {
            expect(err);
        }
    })

    it('T4: delete huts', async () => {
        try {
            await API.deleteHut("Hut 0");
        } catch (err) {
            console.log(err);
        }
    })

    it('T5: delete huts', async () => {
        try {
            await API.deleteHut("Hut 1");
        } catch (err) {
            console.log(err);
        }
    })

    it('T6: invalid picture file, null', async () => {
        const wrongHut = { ...h0, picture: null };

        try {
            await API.addHut(wrongHut);
        }
        catch (err) {
            expect(err);
        }
    });

    it('T7: invalid picture file, too large', async () => {
        const wrongHut = { ...h0, picture: createMockFile("image.jpg", 1024 * 1024 * 10 + 1, "image/tiff") };

        try {
            await API.addHut(wrongHut);
        }
        catch (err) {
            expect(err);
        }
    });

    it('T8: invalid picture file, wrong type', async () => {
        const wrongHut = { ...h0, picture: createMockFile("image.jpg", 1024 * 1024 * 1 - 1, "image/tiff") };

        try {
            await API.addHut(wrongHut);
        }
        catch (err) {
            expect(err);
        }
    });

    it('T9: correct body with png picture', async () => {
        const correctHut = { ...h0, picture: createMockFile("image.jpg", 1024 * 1024 * 1 - 100, "image/png") };

        const res = await API.addHut(correctHut);
        expect(res).toBe(true);
    });
});

describe('frontend test: get hut by radius', () => {

    it('setup', async () => {
        const user = await API.logIn({ username: "g.desantis@localguide.it", password: "password" });
    })

    it('T0: GOOD', async () => {
        const res = await API.getHutsByRadius(44.5, 7, 100000);
        var huts = res.filter((r) => { return isPointInsideRange({ latitude: 44.5, longitude: 7 }, 100000, { latitude: r.latitude, longitude: r.longitude }) });
        expect(res).toStrictEqual(huts);
    })

    it('T1: BAD range', async () => {
        const res = await API.getHutsByRadius(44.5, 7, NaN);
        expect(res).toBeInstanceOf(Array);
        expect(res.length).toBe(0);
    })

    it('T2: BAD latitude and longitude', async () => {
        const res = await API.getHutsByRadius(NaN, NaN, 1000000);
        expect(res).toBeInstanceOf(Array);
        expect(res.length).toBe(0);
    })
});