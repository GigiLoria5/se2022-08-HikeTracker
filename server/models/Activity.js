class Activity {
    constructor (activity){
        Object.keys(activity).forEach(key =>
            this[key] = activity[key]
        )
    }

};

module.exports = Activity;