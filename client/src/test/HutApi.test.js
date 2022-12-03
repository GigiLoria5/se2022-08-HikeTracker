'use strict'
/**
 * @jest-environment node
 */

import API from '../API.js';
import { Hut } from '../Utils/Hut';

const APIURL = 'http://localhost:3001';

describe('frontend test: hut creation', () => {
    
    let h0 = new Hut({
        id:undefined,
        name:"Hut 0",
        city:"Turin",
        province:"TO",
        country:"Italy",
        address:"Corso Duca, 12",
        altitude:"200",
        description:"Description of the hut",
        beds_number:12,
        opening_period:undefined,
        longitude:"12.3456",
        latitude:"65.4321",
        phone_number:"3456789012",
        email:"hut0@hut.it",
        website:"www.hut1.com",
        type:"hiking_hut"
    });

    let h1 = new Hut({
        id:undefined,
        name:"Hut 1",
        city:"Aosta",
        province:"AO",
        country:"Italy",
        address:"Via dei matti, 0",
        altitude:"42",
        description:"Era una casa molto carina",
        beds_number:0,
        opening_period:undefined,
        longitude:"65.4321",
        latitude:"12.3456",
        phone_number:"",
        email:"",
        website:"",
        type:"unmanaged_hut"
    });

    let h2 = new Hut({
        id:undefined,
        name:"Hut 2",
        city:"Turin",
        province:"TO",
        country:"Italy",
        address:"Corso Duca, 12",
        altitude:"200",
        description:"Description of the hut",
        beds_number:12,
        opening_period:undefined,
        longitude:"12.3456",
        latitude:"65.4321",
        phone_number:"3456789012",
        email:"hut2@hut.it",
        website:"www.hut1.com",
        type:""
    });

    let h3 = new Hut({
        id:undefined,
        name:"Hut 3",
        city:"Turin",
        province:"TO",
        country:"Italy",
        address:"Corso Duca, 12",
        altitude:"200",
        description:"Description of the hut",
        beds_number:12,
        opening_period:undefined,
        longitude:12.3456,
        latitude:65.4321,
        phone_number:"3456789012",
        email:"hut2@hut.it",
        website:"www.hut1.com",
        type:"hiking_hut"
    });

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