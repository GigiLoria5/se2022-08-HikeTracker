class Hike {
    constructor (title,
        peak_altitude,
        city,
        province,
        country,
        description,
        ascent,
        track_length,
        expected_time,
        difficulty, 
        gps_track, 
        start_point,
        end_point,
    ){
        this.title = title;
        this.peak_altitude = peak_altitude;
        this.city = city;
        this.province = province;
        this.country = country;
        this.description = description,
        this.ascent = ascent,
        this.track_length = track_length,
        this.expected_time = expected_time,
        this.difficulty = difficulty, 
        this.gps_track = gps_track, 
        this.start_point= start_point, 
        this.end_point = end_point
    }

};

module.exports = Hike;