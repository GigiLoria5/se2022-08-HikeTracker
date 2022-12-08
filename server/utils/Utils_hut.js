const Hut = require('../models/Hut');

//It returns the huts applying hut type filters
async function handleHutType(huts, hut_type) {
    const hutTypes = Hut.getHutTypes();
    if (Array.isArray(hut_type)) {
        let temp = [];
        for (let type of hut_type) {
            if (!hutTypes.includes(type)) {
                return -1
            }
            temp = temp.concat(huts.filter(h => h.type == type));
        }
        huts = temp;
        return huts;
    } else {
        if (!hutTypes.includes(hut_type)) {
            return -1
        }
        huts = huts.filter(h => hut_type.includes(h.type));
        return huts;
    }
}

//It returns the huts applying range filters
async function handleRangeFilters(result, rangeFilters) {
    for (const key in rangeFilters) {
        if (rangeFilters[key][0] && rangeFilters[key][1]) {
            if (rangeFilters[key][0] > rangeFilters[key][1]) {
                return -1;
            }
            result = result.filter(h => h[key] >= rangeFilters[key][0] && h[key] <= rangeFilters[key][1]); 
        }
    }
    return result
}

module.exports = { handleHutType, handleRangeFilters };