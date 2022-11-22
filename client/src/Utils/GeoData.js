import Countries from "./Countries.json"
import States from "./States.json"
import Cities from "./Cities.json"


const getCountries = async () => {
  return Countries;
}

const getProvincesByCountry = async (country) => {
 return States.filter(a=>a.country_name===country).map(a=>a.name);
}

const getCitiesByProvince = async (country, province) => {
  return Cities.filter(a=>(a.country_name===country && a.state_name===province)).map(a=>a.name);
}

/*const getCountries = async () => {
    const c = await Countries.getCountries({
        sort: {
            mode: 'alphabetical',
            key: 'name',
          }
    });
    return c.map(c=>c.name);
}

const getProvincesByCountry = async (country) => {
    const countries = await Countries.getCountries();
    const countryID = countries.filter(a=>a.name==country).map(a=>a.iso2)[0];
    //console.log(countryID);
    const s = await States.getStates({
        sort: {
            mode: 'alphabetical',
            key: 'name',
          },
        filters: {
            country_code: countryID,
            is_region: [false, undefined],
          }
    });
    return s.map(s=>s.name);
}

const getCitiesByProvince = async (country, province) => {
    const countries = await Countries.getCountries();
    const countryID = countries.filter(a=>a.name==country).map(a=>a.id)[0];

    const provinces = await States.getStates({
        sort: {
            mode: 'alphabetical',
            key: 'name',
          },
        filters: {
            country_id: countryID,
            is_region: [false, undefined],
          }
    });
    const provinceID = provinces.filter(a=>a.name==province).map(a=>a.id)[0];
    const cities = await Cities.getCities({
        sort: {
            mode: 'alphabetical',
            key: 'name',
          },
        filters: {
          country_id: countryID,
          state_id: provinceID, // Region iso2
        },
      })
    return cities;
}*/

export {getCountries, getProvincesByCountry, getCitiesByProvince};