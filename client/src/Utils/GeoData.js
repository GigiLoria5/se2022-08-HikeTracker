import Countries from "./GeoDataJson/Countries.json"
import States from "./GeoDataJson/States.json"
import Cities from "./GeoDataJson/Cities.json"


const getCountries = async () => {
  return Countries;
}

const getProvincesByCountry = async (country) => {
 return States.filter(a=>a.country_name===country).map(a=>a.name);
}

const getCitiesByProvince = async (country, province) => {
  return Cities.filter(a=>(a.country_name===country && a.state_name===province)).map(a=>a.name);
}


export {getCountries, getProvincesByCountry, getCitiesByProvince};