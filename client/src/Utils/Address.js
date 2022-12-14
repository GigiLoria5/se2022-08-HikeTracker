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
class Address {
    constructor(address) {
        Object.keys(address).forEach(key =>
            this[key] = address[key]
        )
    }
}

/**
 * Validates an address 
 * @param {Address} location 
 */
function validateAddress(location, country, province, city) {
    /* VALIDATE COUNTRY  */
    if (location.country !== country) {
        return "country";
    }

    /* Italy provinces and Cities are managed differently  */
    if (country === "Italy") {

        /* VALIDATE PROVINCE  */
        const provinceita = translateProvinceReverse(province);

        if ( location.county!==undefined && !(location.county.includes(provinceita)||location.county.includes(province))) {
            return "province";
        }

        /* VALIDATE CITY  */
        if (location.city !== city) {
            return "city";
        }


    } else {

        /* VALIDATE PROVINCE ("states" for other countries)  */
        const provinceclear = province.replace('-', ' ');
        const stateclear = location.state.replace('-', ' ');
        if (stateclear !== provinceclear) {
            return "province";
        }

        /* VALIDATE CITY  */
        if (location.city !== city) {
            return "city";
        }

    }

    return "true";
}

/* Translates from Italian -> English, where possible */
function translateProvince(province) {
    switch (province) {
        case "Torino": return "Turin";
        case "Milano": return "Milan";
        case "Venezia": return "Venice";
        case "Napoli": return "Naples";
        case "Roma": return "Rome";
        case "Firenze": return "Florence";
        case "Valle D'Aosta": return "Aosta";
        case "Provincia di Trento": return "Trento";
        default: return province;
    }
}

/* Translates from English -> Italian, where possible */
function translateProvinceReverse(province) {
    switch (province) {
        case "Turin": return "Torino";
        case "Milan": return "Milano";
        case "Venice": return "Venezia";
        case "Naples": return "Napoli";
        case "Rome": return "Roma";
        case "Florence": return "Firenze";
        case "Aosta": return "Valle D'Aosta";
        case "Trento": return "Provincia di Trento";
        default: return province;
    }
}


module.exports = { Address, validateAddress, translateProvince };
