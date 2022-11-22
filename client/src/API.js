import { logIn, logOut, getUserInfo, addUser } from './API/Authentication';
import { createHike, getCountries, getProvincesByCountry, getCitiesByProvince, getHikesWithFilters } from './API/Hikes';
import { addHut } from './API/Hut';

const API = {
    logIn, logOut, getUserInfo, addUser,
    createHike, getCountries, getProvincesByCountry, getCitiesByProvince, getHikesWithFilters,
    addHut
};
export default API;
