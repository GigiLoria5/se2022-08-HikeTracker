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

describe('Get completed activity frontend test', () => {

    it('T0: login', async () => {
        const user = await API.logIn({ username: "c.basile@hiker.it", password: "password" });
    });

    it('T1: get completed activity [GOOD]', async () => {
        const res = await API.getCompletedActivities();
        expect(res).toBeInstanceOf(Array);
    });

    it('T1.5: login', async () => {
        const user = await API.logIn({ username: "manager@manager.com", password: "password" });
    });

    it('T2: get completed activity [WRONG USER ROLE]', async () => {
        try {
            const res = await API.getCompletedActivities();
        }
        catch (err) {
            expect(err);
        }
    });
    
});

describe('Add activity frontend test', () => {

    it('Test Logout', async () => {
        const user = await API.logOut();
    });

    it('T1: terminate activity [NO USER AUTHENTICATED]', async () => {
        const activity = new Activity({end_time:"2022-12-29 09:30"});
        try{
            const res = await API.terminateActivity(activity);
        } catch(err){
            expect(err).toBe("{\"error\":\"Not authorized\"}");
        }
    });

    it('Test Setup [WRONG]', async () => {
        const user = await API.logIn({ username: "manager@manager.com", password: "password" });
    });

    it('T2: terminate activity [WRONG USER ROLE]', async () => {
        const activity = new Activity({end_time:"2022-12-29 09:30"});
        try{
            const res = await API.terminateActivity(activity);
        } catch(err){
            expect(err).toBe("{\"error\":\"Not authorized\"}");
        }
    });

    it('Test Setup [GOOD]', async () => {
        const user = await API.logIn({ username: "c.basile@hiker.it", password: "password" });
    });

    it('T3: terminate activity [NO RUNNING ACTIVITY]', async () => {
        const activity = new Activity({end_time:"2022-12-29 09:30"});
        try{
            const res = await API.terminateActivity(activity);
        } catch(err){
            expect(err).toBe("{\"error\":\"No hike activity to terminate!\"}");
        }
    });

    it('T4: terminate activity [WRONG DATE 1]', async () => {
        const activity = new Activity({end_time:"29/12/2022 09:30"});
        try{
            const res = await API.terminateActivity(activity);
        } catch(err){
            expect(err).toBe("{\"error\":\"Fields validation failed!\"}");
        }
    });

    it('T5: terminate activity [WRONG DATE 2]', async () => {
        const activity = new Activity({end_time:1});
        try{
            const res = await API.terminateActivity(activity);
        } catch(err){
            expect(err).toBe("{\"error\":\"Fields validation failed!\"}");
        }
    });

    it('T6: terminate activity [WRONG DATE 3]', async () => {
        const activity = new Activity({end_time:"29/20/2022 09:30"});
        try{
            const res = await API.terminateActivity(activity);
        } catch(err){
            expect(err).toBe("{\"error\":\"Fields validation failed!\"}");
        }
    });

    it('T7: terminate activity [WRONG DATE 4]', async () => {
        const activity = new Activity({end_time:"29/12/2022 0930"});
        try{
            const res = await API.terminateActivity(activity);
        } catch(err){
            expect(err).toBe("{\"error\":\"Fields validation failed!\"}");
        }
    });

    it('Add activity', async () => {
        const activity = new Activity({hike_id:1, start_time:"2022-12-29 09:00"});
        const res = await API.addActivity(activity);
        expect(res).toBe(true);
    });

    it('T8: terminate activity [END DATE BEFORE START DATE]', async () => {
        const activity = new Activity({end_time:"2022-12-29 08:30"});
        try{
            const res = await API.terminateActivity(activity);
        } catch(err){
            expect(err).toBe("{\"error\":\"End time must be afterwards start time!\"}");
        }
    });

    it('T9: terminate activity [GOOD]', async () => {
        const activity = new Activity({end_time:"2022-12-29 09:30"});
        const res = await API.terminateActivity(activity);
        expect(res).toBe(true);
    });
    
});