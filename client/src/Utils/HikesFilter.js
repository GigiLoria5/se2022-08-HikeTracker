/////////////////////////////////////////////////////////////////////
//////           THIS COMPONENT WILL BE DELETED                //////
/////////////////////////////////////////////////////////////////////

const timeFromState = (timeValue) => {
    let val = null;
    switch (timeValue) {
        case "0 - 1 h":
            val = "0-1";
            break;
        case "1 - 3 h":
            val = "1-3";
            break;
        case "3 - 5 h":
            val = "3-5";
            break;
        case "More than 5 h":
            val = "5-more";
            break;
        default:
            break;
    }
    return val;
}

const ascentFromState = (ascentValue) => {
    let val = null;
    switch (ascentValue) {
        case "0 - 300 m":
            val = "0-300";
            break;
        case "300 - 600 m":
            val = "300-600";
            break;
        case "600 - 1000 m":
            val = "600-1000";
            break;
        case "More than 1000 m":
            val = "1000-more";
            break;
        default:
            break;
    }
    return val;
}

const lengthFromState = (lengthValue) => {
    let val = null;
    switch (lengthValue) {
        case "0 - 5 km":
            val = "0-5";
            break;
        case "5 - 15 km":
            val = "5-15";
            break;
        case "More than 15 km":
            val = "15-more";
            break;
        default:
            break;
    }
    return val;
}

const difficultyFromState = (difficultyValue) => {
    let val = null;
    switch (difficultyValue) {
        case "Tourist":
            val = 1;
            break;
        case "Hiker":
            val = 2;
            break;
        case "Professionnal Hiker":
            val = 3;
            break;
        default:
            break;
    }
    return val;
}

export { timeFromState, ascentFromState, lengthFromState, difficultyFromState };