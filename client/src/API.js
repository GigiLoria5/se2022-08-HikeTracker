import { logIn, logOut, getUserInfo, addUser } from './API/Authentication';
import { createHike, getCountries, getProvincesByCountry, getCitiesByProvince, getHikesWithFilters, getHikeById } from './API/Hikes';
import { addHut, deleteHut } from './API/Hut';
import { addParking, deleteParking } from './API/Parking';
import {getAddressByCoordinates} from './API/Points';

const API = {
    logIn, logOut, getUserInfo, addUser,
    createHike, getCountries, getProvincesByCountry, getCitiesByProvince, getHikesWithFilters,
    addHut, deleteHut, getHikeById, 
    addParking, deleteParking,
    getAddressByCoordinates
};
export default API;
