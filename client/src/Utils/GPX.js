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
    const expectedTime = (t1.getTime()-t2.getTime())/3600000;
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

module.exports = {parseGPX};