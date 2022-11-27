'use strict'
/**
 * @jest-environment node
 */

import API from '../API.js';
import { Hut } from '../Utils/Hut';

const APIURL = 'http://localhost:3001';

describe('frontend test: hut creation', () => {
    
    let h0 = new Hut(
        undefined, "Hut 0", "Turin", "TO", "Italy", "Corso Duca, 12", "200",
        "Description of the hut", 12, undefined, "12.3456", "65.4321",
        "3456789012", "hut0@hut.it", "www.hut1.com", "hiking_hut"
    );

    let h1 = new Hut(
        undefined, "Hut 1", "Aosta", "AO", "Italy", "Via dei matti, 0", "42",
        "Era una casa molto carina", 0, undefined, "65.4321", "12.3456", 
        "", "", "", "unmanaged_hut"
    );

    let h2 = new Hut(
        undefined, "Hut 2", "Turin", "TO", "Italy", "Corso Duca, 12", "200",
        "Description of the hut", 12, undefined, "12.3432", "65.4321",
        "3456789012", "hut2@hut.it", "www.hut1.com", ""
    );

    let h3 = new Hut(
        undefined, "Hut 3", "Turin", "TO", "Italy", "Corso Duca, 12", "200",
        "Description of the hut", 12, undefined, 12.3456, 65.4321,
        "3456789012", "hut3@hut.it", "www.hut1.com", "hiking_hut"
    );

    it('setup', async () => {
        const user = await API.logIn({username:"g.desantis@localguide.it", password:"password"});
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
        try{
            await API.addHut(h2);
        }
        catch (err){
            expect(err);
        }  
    })

    it('T3: wrong-type field', async () => {
        try{
            await API.addHut(h3);
        }
        catch (err){
            expect(err);
        } 
    })

    it('T4: delete huts', async() =>{
        try {
            await API.deleteHut("Hut 0");
        } catch (err){
            console.log(err);
        } 
    })

    it('T5: delete huts', async() =>{
        try {
            await API.deleteHut("Hut 1");
        } catch (err){
            console.log(err);
        } 
    })
});