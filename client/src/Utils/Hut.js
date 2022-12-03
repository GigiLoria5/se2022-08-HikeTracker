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
    constructor(hut){
        Object.keys(hut).forEach(key =>
            this[key] = hut[key]
        )
    }
}

/**
 * Validates a hut before sending it to the backend
 * @param {Hut} hut 
 */
function validateHut(hut){
    
    //id: don't care
    //name: not empty string
    if(hut.name == "") return false;
    //city: not empty string
    if(hut.city == "") return false;
    //province: not empty string
    if(hut.province == "") return false;
    //country: not empty string
    if(hut.country == "") return false;
    //address: not empty string
    if(hut.address == "") return false;
    //altitude: not empty string
    if(hut.altitude == "") return false;
    //description: not empty string
    if(hut.description == "") return false;
    //beds_number: don't care
    //opening_period: don't care
    //longitude: not empty string
    if(hut.longitude == "") return false;
    //latitude: not empty string
    if(hut.latitude == "") return false;
    //phone_number: don't care
    //email: don't care
    //website: don't care
    //type: not empty string
    return (!hut.type == "");
}

module.exports = { Hut, validateHut };
