import { logIn, logOut, getUserInfo, addUser } from './API/Authentication';
import { createHike, getCountries, getProvincesByCountry, getCitiesByProvince, getHikesWithFilters, getHikeById } from './API/Hikes';
import { addHut, getHutsByRadius, deleteHut } from './API/Hut';
import { addParking, getParkingsByRadius, deleteParking } from './API/Parking';
import {getAddressByCoordinates} from './API/Points';

const API = {
    logIn, logOut, getUserInfo, addUser,
    createHike, getCountries, getProvincesByCountry, getCitiesByProvince, getHikesWithFilters,
    addHut, deleteHut, getHikeById, getHutsByRadius,
    addParking, deleteParking, getParkingsByRadius,
    getAddressByCoordinates
};
export default API;
