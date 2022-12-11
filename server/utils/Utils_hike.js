const hutDao = require('../dao/HutDAO');
const locationDao = require('../dao/LocationDAO');
const parkingDao = require('../dao/ParkingDAO');

//It returns all the informations about a hut/parking_lot/location from the type and the id
async function getPoint(type, id) {
    let res = null;
    switch (type) {
        case "location":
            res = await locationDao.getLocationById(id);
            break;
        case "hut":
            res = await hutDao.getHutById(id);
            break;
        case "parking_lot":
            res = await parkingDao.getParkingLotById(id);
            break;
    }
    return res;
}

/**
 * 
 * @param {*} point is a start point or an end point 
 * @returns {*} point_id
 */
async function setPoint(point) {
    let point_id;
    if(point.type === "hut" || point.type === "parking_lot"){
        point_id = point.value;
    }
    else{
        point_id = await locationDao.addLocation(point); 
        point.type = "location";
    }
    return point_id;
}

/**
 * 
 * @param {*} point is a start point or an end point
 */
function verifyPointDescription(point){
    if(point.type !== "hut" && point.type !== "parking_lot"){
        if(point.description.length == 0){
            return false;
        }
    }
    return true;
}

module.exports = { getPoint, setPoint, verifyPointDescription };