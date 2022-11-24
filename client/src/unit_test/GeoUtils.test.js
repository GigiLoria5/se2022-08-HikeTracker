

'use strict'
/**
 * @jest-environment node
 */

import {getCountries, getProvincesByCountry, getCitiesByProvince} from '../Utils/GeoData.js';
describe('GeoUtils Test', () =>{
    let countries;

    it('T0: countries exist', async () => {
        const a = await getCountries();
        expect(a).toBeInstanceOf(Array);
        expect(a.length).toBeGreaterThan(0);
        for(const c of a){
            expect(typeof c).toBe('string');
            expect(c.length).toBeGreaterThan(0);
        }
        countries = a;
    })

    it('T1: countries are unique', async () => {
        for(const c of countries){
            const eq_countries = countries.filter(a=> a == c);
            expect(eq_countries.length).toBe(1);
        }
    })

    it('T2: each country has got at least one province', async() => {
        for(const c of countries){
            const b = await getProvincesByCountry(c);
            expect(b).toBeInstanceOf(Array);
            expect(b.length).toBeGreaterThan(0);
            for(const p of b){
                expect(typeof p).toBe('string');
                expect(p.length).toBeGreaterThan(0);
            }
        }
        
    })

    it('T3: provinces are unique within a country', async() => {
        for(const c of countries){
            const b = await getProvincesByCountry(c);
            for (const p of b){
                const eq_prov = b.filter(a=> a == p);
                expect(eq_prov.length).toBe(1);
            }
        }  
    })

    it('T4: each province has got at least one city', async() => {
        for(const c of countries){
            const b = await getProvincesByCountry(c);
            for(const prov of b){
                const cities = await getCitiesByProvince(c,prov);
                expect(cities).toBeInstanceOf(Array);
                if(cities.length == 0) {
                    console.log(c + " -- " + prov);
                }
                expect(cities.length).toBeGreaterThan(0);
                for(const cc of cities){
                    expect(typeof cc).toBe('string');
                    expect(cc.length).toBeGreaterThan(0);
                }
            }
        }
        
    })

    it('T5: cities are unique within a province', async() => {
        for(const c of countries){
            const b = await getProvincesByCountry(c);
            for(const prov of b){
                const cities = await getCitiesByProvince(c,prov);
                for(const cc of cities){
                    const eq_cities = cities.filter(a=> a == cc);
                    if(eq_cities.length > 1){
                        console.log(eq_cities);
                    }
                    expect(eq_cities.length).toBe(1);
                }
            }
        }
        
    })

    it('T6: check Italy regions', async() => {
        const italyRegions = await getProvincesByCountry("Italy");
        expect(italyRegions.length).toBe(20);
        
    })
})