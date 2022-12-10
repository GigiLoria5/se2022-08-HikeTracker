'use strict'
/**
 * @jest-environment node
 */

import API from '../API.js';
import { Parking } from '../Utils/Parking';

const APIURL = 'http://localhost:3001';

describe('frontend test: hut creation', () => {
    
    const p0 = new Parking(undefined, "Turin", "Turin", "Italy", "0", "12.3456", "Corso Vittorio Emanuele II", 100);
    const p1 = new Parking(undefined, "Turin", "Turin", "Italy", "12.0000", "65.4321", "", 100); //missing address
    const p2 = new Parking(undefined, "", "Turin", "Italy", "65.4321", "65.4321", "Corso Castelfidardo", 100); //missing city
    const p3 = new Parking(undefined, "", "", "Italy", "65.4567", "45.4321", "Corso Duca degli Abruzzi", 100); //missing city and province
    const p4 = new Parking(undefined, "", "", "", "10.9876", "54.3210", "Via Roma", 100); //missing city, province and country
    
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