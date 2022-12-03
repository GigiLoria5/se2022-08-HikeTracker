/**
 * Constructor function for new Address object
 * @param {string} road
 * @param {string} town 
 * @param {string} county 
 * @param {string} state 
 * @param {string} postcode 
 * @param {string} country 
 * @param {string} country_code 
 * @param {string} village
 * @param {string} road
 * @param {string} hamlet
 * @param {string} suburb
 * @param {int} house_number
 */
class Address{
    constructor(address){
        Object.keys(address).forEach(key =>
            this[key] = address[key]
        )
    }
}

/**
 * Validates an address 
 * @param {Address} location 
 */
 function validateAddress(location, country, province, city, address){
    if(location.country!==country){
        return "Wrong country";
    }

    if(country=== "Italy"){
            var provinceita;
            switch(province){
                case "Turin": provinceita="Torino"; break;
                case "Milan": provinceita="Milano"; break;
                case "Venice": provinceita="Venezia"; break;
                case "Naples": provinceita="Napoli"; break;
                case "Rome": provinceita="Roma"; break;
                case "Florence": provinceita="Firenze"; break;
                default: provinceita=province;
            }

            if(location.county!==provinceita){ 
                return "Wrong province"; 
            }
            if(location.city!==undefined){
                if(location.city!==city){return "Wrong city"}
            }else{
                if(location.town!==undefined){
                    if(location.town!==city){return "Wrong town"}
                }else{
                    if(location.village!==undefined){
                        if(location.village!==city){return "Wrong village"}
                    }else{
                        if(location.hamlet!==undefined){
                            if(location.hamlet!==city){return "Wrong hamlet"}
                        }
                    }
                }
            }
        }else{

        // Province corresponds to state
        const provinceclear = province.replace('-', ' ');
        const stateclear = location.state.replace('-', ' ');
            if(stateclear!==provinceclear){ 
                return "Wrong province"; 
            }
            if(location.city!==undefined){
                if(location.city!==city){return "Wrong city"}
            }else{
                if(location.town!==undefined){
                    if(location.town!==city){return "Wrong town"}
                }else{
                    if(location.municipality!==undefined){
                        if(location.municipality!==city){return "Wrong municipality"}
                    }else{
                        if(location.village!==undefined){
                            if(location.village!==city){return "Wrong village"}
                        }
                    }
                }
            }

    }

    if(location.road!==undefined){
        const addressNoDigitsNoSpace = address.replace(/[0-9]/g, '').toLowerCase().trim().replace(/\s+/g, ''); // Trim string, remove spaces and digits and put lowercase
        const locationNoDigitsNoSpace = (location.road).toLowerCase().replace(/\s+/g, ''); // Remove spaces and put string in lowercase

        if(locationNoDigitsNoSpace!==addressNoDigitsNoSpace){return "Wrong address"}
    }
    return true;
 }



module.exports = { Address, validateAddress };
