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
function validateAddress(location, country, province, city, address) {
    /* VALIDATE COUNTRY  */
    if (location.country !== country) {
        return "country";
    }

    /* Italy provinces and Cities are managed differently  */

    if (country === "Italy") {

        /* VALIDATE PROVINCE  */
        const provinceita = translateProvince(province);

        if (location.county !== provinceita) {
            return "province";
        }

        /* VALIDATE CITY  */
        const array = [location.city, location.town, location.village, location.hamlet];
        const result = validateCity(array, city);
        if (result) return "city";


    } else {

        /* VALIDATE PROVINCE ("states" for other countries)  */
        const provinceclear = province.replace('-', ' ');
        const stateclear = location.state.replace('-', ' ');
        if (stateclear !== provinceclear) {
            return "province";
        }

        /* VALIDATE CITY  */
        const array = [location.city, location.town, location.municipality, location.village];
        const result = validateCity(array, city);
        if (result) return "city";

    }

    /* VALIDATE ADDRESS  */
    if (location.road !== undefined) {
        const addressNoDigitsNoSpace = address.replace(/\d+/g, '').toLowerCase().trim().replace(/\s+/g, ''); // Trim string, remove spaces and digits and put lowercase
        const locationNoDigitsNoSpace = (location.road).toLowerCase().replace(/\s+/g, ''); // Remove spaces and put string in lowercase

        if (locationNoDigitsNoSpace !== addressNoDigitsNoSpace) { return "address" }
    }
    return "true";
}

function translateProvince(province) {
    switch (province) {
        case "Turin": return "Torino";
        case "Milan": return "Milano";
        case "Venice": return "Venezia";
        case "Naples": return "Napoli";
        case "Rome": return "Roma";
        case "Florence": return "Firenze";
        default: return province;
    }
}

function validateCity(array, city) {
    let result = false;
    array.forEach(item => {
        if (item !== undefined && item !== city) {
            result = true;
        }
    });
    return result;
}


module.exports = { Address, validateAddress };
