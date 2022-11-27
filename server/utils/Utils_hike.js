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

module.exports = { getPoint };