
//It returns all the informations about a hut/parking_lot/location from the type and the id
async function handleHutType(huts, hut_type, hutTypes) {
    if(Array.isArray(hut_type)){
        let temp = [];
        for(let type of hut_type){
            console.log(type);
            if(!hutTypes.includes(type)){
                return -1
            }
            temp = temp.concat(huts.filter(h => h.type == type));
        }
        huts = temp;
        return huts;
    } else {
        if(!hutTypes.includes(hut_type)){
            return -1
        }
        huts = huts.filter(h => hut_type.includes(h.type));
        return huts;
    }
}

module.exports = { handleHutType };