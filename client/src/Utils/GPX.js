const gpxParser = require('gpxparser');

//*IMPORTED FROM: https://stackoverflow.com/questions/18883601*//
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }


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
    console.log(gpx);
    if(gpx.tracks.length == 0){
        return parseGPXnoPoints(gpx.waypoints);
    }
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

const parseGPXnoPoints = (points) => {
    console.log(points);
    const t1 = points[points.length-1].time;
    const t2 = points[0].time;
    let expectedTime = 0;
    if(t1 != null && t2 != null){
        expectedTime = (t1.getTime()-t2.getTime())/3600000;
    }

    const elevations=points.map(a=>a.ele);
    const eleMax = elevations.reduce((a,b) => {
        if(a>b) return a;
        else return b;
    })

    
    let el = 0;
    let e_old = elevations[0];
    for(const e of elevations){
        if(e > e_old){
            el += e - e_old;
        }
        e_old = e;
    }

    let dist = 0;
    for (let i = 0; i < points.length - 1; i++) {
        dist += getDistanceFromLatLonInKm(points[i].lat, points[i].lon, points[i+1].lat, points[i+1].lon);
    } 

    return new GPXData(
        dist,
        points[0].lat,
        points[0].lon,
        points[points.length-1].lat,
        points[points.length-1].lon,
        el,
        eleMax,
        expectedTime);
}

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