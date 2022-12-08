/**
 * Constructor function for new Hut objects
 * @param {int} id 
 * @param {string} name 
 * @param {string} city 
 * @param {string} province 
 * @param {string} country 
 * @param {string} address 
 * @param {int} altitude 
 * @param {string} description 
 * @param {int} beds_number 
 * @param {string} opening_period
 * @param {string} coordinates 
 * @param {string} phone_number 
 * @param {string} email 
 * @param {string} website 
 * @param {string} type
 */
class Hut {
    constructor(hut) {
        Object.keys(hut).forEach(key =>
            this[key] = hut[key]
        )
    }

    static getHutTypes() {
        const hutTypes = ['alpine_hut', 'fixed_bivouac', 'unmanaged_hut', 'hiking_hut', 'other'];
        return hutTypes;
    }
}


module.exports = Hut;
