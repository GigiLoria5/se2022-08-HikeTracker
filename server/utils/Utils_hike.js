const hutDao = require('../dao/HutDAO');
const locationDao = require('../dao/LocationDAO');
const parkingDao = require('../dao/ParkingDAO');

//It returns all the informations about a hut/parking_lot/location from the type and the id
async function getPoint(type, id){
    if (type == 'hut') {
        return await hutDao.getHutById(id);
    } else if (type == 'parking_lot') {
        return await parkingDao.getParkingLotById(id);
    } else if (type == 'location') {
        return await locationDao.getLocationById(id);
    }
}

module.exports = {getPoint};