
/**
 * 
 * @param {String} pointType can be: hut, parking_lot or location
 * @param {Object} point object containing the point information (as written in documentation)
 * @returns a string briefly summarising the main point information
 */
const getPointShortDescription = (pointType, point) => {
    if (pointType === 'hut')
        return `${point.name} at ${point.address} ${point.city}, ${point.country}`;
    if (pointType === 'parking_lot')
        return `Parking lot at ${point.address} ${point.city}, ${point.country}`;
    if (pointType !== 'location')
        return 'Point type not present';
    switch (point.value_type) {
        case 'name':
            return `${point.value} - ${point.description}`;
        case 'address':
            return `${point.description} at ${point.value}`;
        case 'gps':
            return `${point.description}`;
        default:
            return 'Location type not present';
    }
}

export { getPointShortDescription };