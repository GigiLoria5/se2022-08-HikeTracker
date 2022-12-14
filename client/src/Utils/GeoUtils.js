const { getDistance } = require('geolib');

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
 * @param {String} coordinates "lat, lng" or "lat,lng" 
 * @returns [lat, lng]
 */
const splitCoordinates = (coordinates) => {
    const coordinatesNoSpaces = coordinates.replace(" ", ""); // Remove any possible space
    return coordinatesNoSpaces.split(",");
}

/**
 * 
 * @param {Array} referencePointCoordinates an array containing latitude and longitute of a point (ex. [4.1231231, 2.2131312])
 * @param {Array[Array]} trailCoordinates an array containing arrays of latitute and longitute of points (ex. [[4.1231321, 0.231312], [1.22222, 3.112]])
 * @returns the coordinates inside an array of the farthest point from the referencePoint specified  
 */
const findFarthestPoint = (referencePointCoordinates, trailCoordinates) => {
    let farthestPoint = null;
    let farthestPointDistance = -1;

    for (const actualPoint of trailCoordinates){
        const distance = getDistance(referencePointCoordinates, actualPoint);
        if (distance > farthestPointDistance) {
            farthestPoint = actualPoint;
            farthestPointDistance = distance;
        }
    }

    return farthestPoint;
}

/**
 * 
 * @param {Array} a array containing latitude and longitude as numbers
 * @param {Array} b array containing latitude and longitude as numbers
 * @returns array containing latitude and longitude as numbers which represents the midpoint between a and b
 */
const getMidPoint = ([x1, y1], [x2, y2]) => [(x1 + x2) / 2, (y1 + y2) / 2];

const getClosestPoint = (point, points) => {
    return points
        .map(p1 => { return {point:p1, dist:getDistance(point, p1)}})
        .reduce((p1,p2) => {
            if(p1.dist < p2.dist) return p1;
            else return p2;
        }).point;
}

module.exports = { isPointInsideRange, splitCoordinates, findFarthestPoint, getMidPoint, getClosestPoint };  