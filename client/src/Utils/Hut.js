/**
 * Constructor function for new Hut objects
 * @param {int} id 
 * @param {string} name 
 * @param {string} city 
 * @param {string} province 
 * @param {string} country 
 * @param {string} address 
 * @param {int} altitude 
 * @param {string} description 
 * @param {int} beds_number 
 * @param {string} opening_period
 * @param {string} longitude 
 * @param {string} latitude 
 * @param {string} phone_number 
 * @param {string} email 
 * @param {string} website 
 * @param {string} type
 */
 class Hut{
    constructor(id, name, city, province, country, address, altitude, description, beds_number, opening_period, longitude, latitude, phone_number, email, website, type){
        this.id=id;
        this.name=name;
        this.city=city;
        this.province=province;
        this.country=country;
        this.address=address;
        this.altitude=altitude;
        this.description=description;
        this.beds_number=beds_number;
        this.opening_period=opening_period;
        this.longitude=longitude;
        this.latitude=latitude;
        this.phone_number=phone_number;
        this.email=email;
        this.website=website;
        this.type=type;
    }
}

module.exports = Hut;
