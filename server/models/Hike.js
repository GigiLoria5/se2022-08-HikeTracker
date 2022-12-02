class Hike {
    constructor (hike){
        Object.keys(hike).forEach(key =>
            this[key] = hike[key]
        )
    }

};

module.exports = Hike;