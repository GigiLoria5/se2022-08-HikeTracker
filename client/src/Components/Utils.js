export function Hike(
    title,
    peak_altitude,
    city,
    province,
    country,
    description,
    ascent,
    track_length,
    expected_time,
    difficulty,
    start_point_type,
    start_point_id,
    end_point_type,
    end_point_id,
    reference_points,
    gpx
) {
    this.title = title;
    this.peak_altitude = peak_altitude;
    this.city = city;
    this.province = province;
    this.country = country;
    this.description = description;
    this.ascent = ascent;
    this.track_length = track_length;
    this.expected_time = expected_time;
    this.difficulty = difficulty;
    this.start_point_type = start_point_type
    this.start_point_id = start_point_id;
    this.end_point_type = end_point_type;
    this.end_point_id = end_point_id;
    this.reference_points = reference_points;
    this.gpx = gpx;
}

export function Point(label, lat, long) {
    this.label = label;
    this.coord = [lat, long];
}

export function Trail(startPoint, endPoint, points) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.points = points;
}

export function coordArray(trail){

    const innerArray = trail.points.map(p => p.coord);

    return(
        [
            trail.startPoint.coord,
            ...innerArray,
            trail.endPoint.coord
        ]
    )
}