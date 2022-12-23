import { logIn, logOut, getUserInfo, addUser } from './API/Authentication';
import { createHike, getCountries, getProvincesByCountry, getCitiesByProvince, getHikesWithFilters, getHikeById } from './API/Hikes';
import { addHut, deleteHut, getHutsCountries, getHutsProvincesByCountry, getHutsCitiesByProvince, getHutsWithFilters, getHutById, getHutsByRadius } from './API/Hut';
import { addParking, getParkingsByRadius, deleteParking } from './API/Parking';
import { getAddressByCoordinates } from './API/Points';
import {addActivity, getActiveActivityByHikeId, terminateActivtyByHikeId, deleteActivity, getCompletedActivities} from './API/Activity';

const API = {
    logIn, logOut, getUserInfo, addUser,
    createHike, getCountries, getProvincesByCountry, getCitiesByProvince, getHikesWithFilters, getHikeById,
    addHut, deleteHut, getHutsCountries, getHutsProvincesByCountry, getHutsCitiesByProvince, getHutsWithFilters, getHutById, getHutsByRadius,
    addParking, deleteParking, getParkingsByRadius,
    getAddressByCoordinates,
    addActivity, getActiveActivityByHikeId, terminateActivtyByHikeId, deleteActivity, getCompletedActivities
};
export default API;
