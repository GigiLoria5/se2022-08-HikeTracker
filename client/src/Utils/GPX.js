const gpxParser = require('gpxparser');

function GPXData(
    length,
    start_point_lat,
    start_point_lon,
    end_point_lat,
    end_point_lon,
    ascent,
    peak_altitude,
    expectedTime
) {
    this.length = length;
    this.start_point_lat = start_point_lat;
    this.start_point_lon = start_point_lon;
    this.end_point_lat = end_point_lat;
    this.end_point_lon = end_point_lon;
    this.ascent = ascent;
    this.peak_altitude = peak_altitude;
    this.expectedTime = expectedTime;
}

const parseGPX = async (gpxFile) => {
    const text = await gpxFile.text();
    const gpx = new gpxParser();
    gpx.parse(text);
    const t1 = gpx.tracks[0].points[gpx.tracks[0].points.length-1].time;
    const t2 = gpx.tracks[0].points[0].time;
    let expectedTime = 0;
    if(t1 != null && t2 != null){
        expectedTime = (t1.getTime()-t2.getTime())/3600000;
    }
    return new GPXData(
        gpx.tracks[0].distance.total/1000,
        gpx.tracks[0].points[0].lat,
        gpx.tracks[0].points[0].lon,
        gpx.tracks[0].points[gpx.tracks[0].points.length-1].lat,
        gpx.tracks[0].points[gpx.tracks[0].points.length-1].lon,
        gpx.tracks[0].elevation.pos,
        gpx.tracks[0].elevation.max,
        expectedTime);
};

const getPoints = async (gpxFile) => {
    const text = await gpxFile.text();
    const gpx = new gpxParser();
    gpx.parse(text);
    const positions = gpx.tracks[0].points.map(p => [p.lat, p.lon]);
    return positions;
}

const checkValidGPX = (gpxFileText) => {
    const text = gpxFileText;
    const domParser = new DOMParser();
    const dom = domParser.parseFromString(text, 'text/xml');
    if(dom.documentElement.nodeName === "parsererror"){
        return false;
    }
    return true;
}

module.exports = {parseGPX, getPoints, checkValidGPX};