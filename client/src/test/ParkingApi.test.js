'use strict'
/**
 * @jest-environment node
 */

import API from '../API.js';
import { Parking } from '../Utils/Parking';
import { isPointInsideRange } from '../Utils/GeoUtils';

const APIURL = 'http://localhost:3001';

describe('frontend test: hut creation', () => {
    
    const p0 = new Parking({
        id:undefined,
        city:"Turin",
        province:"Turin",
        country:"Italy",
        latitude:"0",
        longitude:"12.3456", 
        address:"Corso Vittorio Emanuele II",
        capacity:100});
    const p1 = new Parking({
        id:undefined,
        city:"Turin",
        province:"Turin",
        country:"Italy",
        latitude:"12.0000",
        longitude:"65.4321", 
        address:"",
        capacity:100}); //missing address
    const p2 = new Parking({
        id:undefined,
        city:"",
        province:"Turin",
        country:"Italy",
        latitude:"12.0000",
        longitude:"65.4321", 
        address:"Corso Castelfidardo",
        capacity:100}); //missing city
    const p3 = new Parking({
        id:undefined,
        city:"",
        province:"",
        country:"Italy",
        latitude:"12.0000",
        longitude:"65.4321", 
        address:"Corso Castelfidardo",
        capacity:100}); //missing city and province
    const p4 = new Parking({
        id:undefined,
        city:"",
        province:"",
        country:"",
        latitude:"12.0000",
        longitude:"65.4321", 
        address:"Corso Castelfidardo",
        capacity:100}); //missing city, province and country
    
    it('setup user session', async () => {
        const user = await API.logIn({username:"g.desantis@localguide.it", password:"password"});
    })
      
    it('T0: correct body', async () => {
        const res = await API.addParking(p0);
        expect(res).toBe(true);
    })

    it('T1: missing address', async () => {
        try{
            const res = await API.addParking(p1);
        }
        catch (err){
            expect(err);
            console.log(err);
        }  
    })

    it('T2: missing city', async () => {
        try{
            const res = await API.addParking(p2);
        }
        catch (err){
            expect(err);
            console.log(err);
        }  
    })

    it('T3: missing city and province', async () => {
        try{
            const res = await API.addParking(p3);
        }
        catch (err){
            expect(err);
            console.log(err);
        }  
    })

    it('T4: missing city, province and country', async () => {
        try{
            const res = await API.addParking(p4);
        }
        catch (err){
            expect(err);
            console.log(err);
        }  
    })

    it('delete stuff created', async () => {
        try{
            await API.deleteParking(p0.address);
        }
        catch (err){
            console.log(err);
        } 
    })

});

describe('frontend test: get parking lot by radius', () => {

    it('setup', async () => {
        const user = await API.logIn({username:"g.desantis@localguide.it", password:"password"});
    })
      
    it('T0: GOOD', async () => {
        const res = await API.getParkingsByRadius(44.5, 7, 100000);
        var huts = res.filter((r) => {return isPointInsideRange({ latitude: 44.5, longitude: 7 }, 100000, { latitude: r.latitude, longitude: r.longitude })});
        expect(res).toStrictEqual(huts);
    })

    it('T1: BAD range', async () => {
        const res = await API.getParkingsByRadius(44.5, 7, NaN);
        expect(res).toBeInstanceOf(Array);
        expect(res.length).toBe(0);
    })

    it('T2: BAD latitude and longitude', async () => {
        const res = await API.getParkingsByRadius(NaN, NaN, 1000000);
        expect(res).toBeInstanceOf(Array);
        expect(res.length).toBe(0);
    })
});