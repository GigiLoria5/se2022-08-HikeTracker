const gpxParser = require('gpxparser');

export function GPXData(
    length,
    start_point_lat,
    start_point_lon,
    end_point_lat,
    end_point_lon,
    ascent
) {
    this.length = length;
    this.start_point_lat = start_point_lat;
    this.start_point_lon = start_point_lon;
    this.end_point_lat = end_point_lat;
    this.end_point_lon = end_point_lon;
    this.ascent = ascent;
}

const parseGPX = async (gpxFile) => {
    const text = await gpxFile.text();
    const gpx = new gpxParser();
    gpx.parse(text);
    return new GPXData(
        gpx.tracks[0].distance.total/1000,
        gpx.tracks[0].points[0].lat,
        gpx.tracks[0].points[0].lon,
        gpx.tracks[0].points[gpx.tracks.length-1].lat,
        gpx.tracks[0].points[gpx.tracks.length-1].lon,
        gpx.tracks[0].elevation.pos);
}

export {parseGPX};