/**
 * Constructor function for new Parking objects
 * @param {int} id  
 * @param {string} city 
 * @param {string} province 
 * @param {string} country
 * @param {string} coordinates  
 * @param {string} address 
 */
 class Parking{
    constructor(id, city, province, country, coordinates, address){
        this.id=id;
        this.city=city;
        this.province=province;
        this.country=country;
        this.coordinates=coordinates;
        this.address=address;
    }
}

module.exports = Parking;