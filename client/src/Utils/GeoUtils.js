import { getDistance } from 'geolib';

/**
 * 
 * @param {Object} rangePoint the centre point of the range. It must be an object with properties "latitude", "longitude" (e.g. {latitude: 52.518611, longitude: 13.408056}).
 * @param {Number} rangeRadius an integer number which represent the length of the radius in meters.
 * @param {Object} pointToCheck the point whose presence within the range is to be known. It must be defined as rangePoint
 * @returns true if pointToCheck is is inside a circle with centre rangePoint and radius rangeRadius. Otherwise, false.
 */
const isPointInsideRange = (rangePoint, rangeRadius, pointToCheck) => {
    const radiusParsed = parseInt(rangeRadius);
    // Check rangeRadius
    if (isNaN(radiusParsed))
        return false;

    // Check objects
    if (!rangePoint.hasOwnProperty('latitude') || !rangePoint.hasOwnProperty('longitude') || !pointToCheck.hasOwnProperty('latitude') || !pointToCheck.hasOwnProperty('longitude'))
        return false;

    if (isNaN(parseFloat(rangePoint.latitude)) || isNaN(parseFloat(rangePoint.longitude)) || isNaN(parseFloat(pointToCheck.latitude)) || isNaN(parseFloat(pointToCheck.longitude)))
        return false;

    // Calculate distance between poitns
    const distanceBetweenPoints = getDistance(rangePoint, pointToCheck);

    return distanceBetweenPoints > rangeRadius ? false : true;
}

/**
 * 
 * @param {Array} a array containing latitude and longitude as numbers
 * @param {Array} b array containing latitude and longitude as numbers
 * @returns array containing latitude and longitude as numbers which represents the midpoint between a and b
 */
const getMidPoint = ([x1, y1], [x2, y2]) => [(x1 + x2) / 2, (y1 + y2) / 2];

export { isPointInsideRange, getMidPoint }; 