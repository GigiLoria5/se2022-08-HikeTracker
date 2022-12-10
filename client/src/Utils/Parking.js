/**
 * Constructor function for new parking objects
 * @param {int} id 
 * @param {string} city 
 * @param {string} province 
 * @param {string} country 
 * @param {string} longitude 
 * @param {string} latitude
 * @param {string} address  
 */

class Parking{
    constructor(id, city, province, country, longitude, latitude, address, capacity){
        this.id=id;
        this.city=city;
        this.province=province;
        this.country=country;
        this.longitude=longitude;
        this.latitude=latitude;
        this.address=address;
        this.capacity=capacity;
    }
}

/**
 * Validates a parking lot before sending it to the backend
 * @param {Parking} parking 
 */
 function validateParking(parking){
    
    //city: not empty string
    if(parking.city === "") return false;
    //province: not empty string
    if(parking.province === "") return false;
    //country: not empty string
    if(parking.country === "") return false;
    //longitude: not empty string
    if(parking.longitude === "") return false;
    //latitude: not empty string
    if(parking.latitude === "") return false;
    //address: not empty string
    if(parking.address === "") return false;
    return true;

}

module.exports = { Parking, validateParking };