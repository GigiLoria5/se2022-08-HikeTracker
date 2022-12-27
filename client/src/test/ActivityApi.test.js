'use strict'
/**
 * @jest-environment node
 */

import API from '../API.js';
import { Activity } from '../Utils/Activity.js';

const APIURL = 'http://localhost:3001';

describe('Add activity frontend test', () => {

    it('Test Setup', async () => {
        const user = await API.logIn({ username: "c.basile@hiker.it", password: "password" });
    });

    it('T1: add activity [GOOD]', async () => {
        const activity = new Activity({hike_id:1, start_time:"2022-12-27 07:30"});
        const res = await API.addActivity(activity);
        expect(res).toBe(true);
    });

    it('T2: get running activity [GOOD]', async () => {
        const res = await API.getRunningActivity();
        expect(res.hike_id).toBe(1);
    })

    it('T3: add activity while another one is running', async () => {
        const activity = new Activity({hike_id:2, start_time:"2022-12-27 09:30"});
        try {
            const res = await API.addActivity(activity);
        }
        catch (err) {
            expect(err);
        }
    });

    it('Delete the running activity', async () => {
        const res = await API.deleteActivity();
        expect(res).toBe(true);
    });

    it('T4: get running activity [EMPTY]', async () => {
        const res = await API.getRunningActivity();
        expect(res).toBe(false);
    });

    it('T5: add activity with negative hike id', async () => {
        const activity = new Activity({hike_id:-1, start_time:"2022-12-27 07:30"});
        try {
            const res = await API.addActivity(activity);
        }
        catch (err) {
            expect(err);
        }
    });

    it('T6: add activity with float hike id', async () => {
        const activity = new Activity({hike_id: 33.3, start_time:"2022-12-27 07:30"});
        try {
            const res = await API.addActivity(activity);
        }
        catch (err) {
            expect(err);
        }
    });

    it('T7: add activity with string hike id', async () => {
        const activity = new Activity({hike_id: "abab", start_time:"2022-12-27 07:30"});
        try {
            const res = await API.addActivity(activity);
        }
        catch (err) {
            expect(err);
        }
    });

    it('T8: add activity with hike id not in the db', async () => {
        const activity = new Activity({hike_id: 98765, start_time:"2022-12-27 07:30"});
        try {
            const res = await API.addActivity(activity);
        }
        catch (err) {
            expect(err);
        }
    });

    it('T9: add activity with negative hike id', async () => {
        const activity = new Activity({hike_id:-1, start_time:"2022-12-27 07:30"});
        try {
            const res = await API.addActivity(activity);
        }
        catch (err) {
            expect(err);
        }
    });

    it('T10: add activity with wrong time format', async () => {
        const activity = new Activity({hike_id:1, start_time:"27/12/2022 07:30"});
        try {
            const res = await API.addActivity(activity);
        }
        catch (err) {
            expect(err);
        }
    });

    it('T11: add activity with impossible time', async () => {
        const activity = new Activity({hike_id:1, start_time:"2022-12-32 07:30"});
        try {
            const res = await API.addActivity(activity);
        }
        catch (err) {
            expect(err);
        }
    });

});