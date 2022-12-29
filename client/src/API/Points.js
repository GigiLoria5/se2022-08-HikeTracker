
// get
// Return provinces by a country
/*
async function getAddressByCoordinates(longitude, latitude) {
    const url =  'https://nominatim.openstreetmap.org/reverse?format=json&lat='+latitude+'&lon='+longitude+'&accept-language=en&zoom=10';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const InfoJson = await response.json();

        if (response.ok) {
            return InfoJson.address;
        } else {
            throw InfoJson;
        }
    } catch (err) {

        console.log(err);
        throw err;
    }
}
*/

async function getAddressByCoordinates(longitude, latitude) {
    const url =  'https://api.geoapify.com/v1/geocode/reverse?lat='+latitude+'&lon='+longitude+'&apiKey=cd8f1ca442004fad894cd6f352714cba';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const InfoJson = await response.json();

        if (response.ok) {
            return InfoJson.features[0].properties;
            
        } else {
            throw InfoJson;
        }
    } catch (err) {
        /* Network error */
        console.log(err);
        throw err;
    }
}

export {getAddressByCoordinates}