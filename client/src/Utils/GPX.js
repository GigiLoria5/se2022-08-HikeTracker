const { getDistance } = require('geolib');
const gpxParser = require('gpxparser');

class GPXData {
    constructor(length,
        start_point_lat,
        start_point_lon,
        end_point_lat,
        end_point_lon,
        ascent,
        peak_altitude,
        expectedTime) {
        this.length = length;
        this.start_point_lat = start_point_lat;
        this.start_point_lon = start_point_lon;
        this.end_point_lat = end_point_lat;
        this.end_point_lon = end_point_lon;
        this.ascent = ascent;
        this.peak_altitude = peak_altitude;
        this.expectedTime = expectedTime;
    }
}

const parseGPX = async (gpxFile) => {
    const text = await gpxFile.text();
    const gpx = new gpxParser();
    gpx.parse(text);
    if (gpx.tracks.length === 0) {
        return parseGPXnoPoints(gpx.waypoints);
    }
    const t1 = gpx.tracks[0].points[gpx.tracks[0].points.length - 1].time;
    const t2 = gpx.tracks[0].points[0].time;
    let expectedTime = 0;
    if (t1 != null && t2 != null) {
        expectedTime = (t1.getTime() - t2.getTime()) / 3600000;
    }
    return new GPXData(
        parseFloat((gpx.tracks[0].distance.total / 1000).toFixed(1)),
        gpx.tracks[0].points[0].lat,
        gpx.tracks[0].points[0].lon,
        gpx.tracks[0].points[gpx.tracks[0].points.length - 1].lat,
        gpx.tracks[0].points[gpx.tracks[0].points.length - 1].lon,
        Math.floor(gpx.tracks[0].elevation.pos),
        Math.floor(gpx.tracks[0].elevation.max),
        parseFloat((expectedTime.toFixed(2)))
    );
};

const parseGPXnoPoints = (points) => {
    const t1 = points[points.length - 1].time;
    const t2 = points[0].time;
    let expectedTime = 0;
    if (t1 != null && t2 != null) {
        expectedTime = (t1.getTime() - t2.getTime()) / 3600000;
    }

    const elevations = points.map(a => a.ele);
    const eleMax = elevations.reduce((a, b) => {
        if (a > b) return a;
        else return b;
    })


    let el = 0;
    let e_old = elevations[0];
    for (const e of elevations) {
        if (e > e_old) {
            el += e - e_old;
        }
        e_old = e;
    }

    let dist = 0;
    for (let i = 0; i < points.length - 1; i++) {
        dist += getDistance([points[i].lat, points[i].lon], [points[i+1].lat, points[i+1].lon]);
    }

    return new GPXData(
        parseFloat(dist.toFixed(1)),
        points[0].lat,
        points[0].lon,
        points[points.length - 1].lat,
        points[points.length - 1].lon,
        Math.floor(el),
        Math.floor(eleMax),
        parseFloat((expectedTime.toFixed(2)))
    );
}

const getPoints = async (gpxFile) => {
    const text = await gpxFile.text();
    const gpx = new gpxParser();
    gpx.parse(text);
    if (gpx.tracks.length === 0) {
        return gpx.waypoints.map(p => [p.lat, p.lon]);
    }
    const positions = gpx.tracks[0].points.map(p => [p.lat, p.lon]);
    return positions;
}

const checkValidGPX = (gpxFileText) => {
    const text = gpxFileText;
    const domParser = new DOMParser();
    const dom = domParser.parseFromString(text, 'text/xml');
    if (dom.documentElement.nodeName === "parsererror") {
        return false;
    }
    return true;
}

module.exports = { parseGPX, getPoints, checkValidGPX };