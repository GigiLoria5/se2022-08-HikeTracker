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
        start_point_type, 
        start_point_id, 
        end_point_type, 
        end_point_id
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
        this.start_point_type = start_point_type, 
        this.start_point_id = start_point_id, 
        this.end_point_type = end_point_type, 
        this.end_point_id = end_point_id
    }

    isValid(){
        if (this.title == null || this.title == undefined ||
            this.peak_altitude == null || this.peak_altitude == undefined || isNaN(this.peak_altitude) ||
            this.city == null || this.city == undefined ||
            this.province == null || this.province == undefined ||
            this.country == null || this.country == undefined ||
            this.description == null || this.description == undefined ||
            this.ascent == null || this.ascent == undefined || isNaN(this.ascent) ||
            this.track_length == null || this.track_length == undefined || isNaN(this.track_length) ||
            this.expected_time == null || this.expected_time == undefined || isNaN(this.expected_time) ||
            this.difficulty == null || this.difficulty == undefined || isNaN(this.difficulty) ||
            this.gps_track == null || this.gps_track == undefined ||
            this.start_point_type == null || this.start_point_type == undefined ||
            this.start_point_id == null || this.start_point_id == undefined || isNaN(this.start_point_id) ||
            this.end_point_type == null || this.end_point_type == undefined ||
            this.end_point_id == null || this.end_point_id == undefined || isNaN(this.end_point_id))
            return false;
        return true;
    }
};

module.exports = Hike;