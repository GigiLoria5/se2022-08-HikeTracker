
// get
// Return provinces by a country
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
        /* Network error */
        console.log(err);
        throw err;
    }
}

export {getAddressByCoordinates}