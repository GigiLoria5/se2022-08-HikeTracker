const timeToHHMM = (t) => {
    const hh = Math.floor(t);
    const mm = (t - Math.floor(t))*60;
    return hh+":"+mm.toFixed(0);
}

module.exports = {timeToHHMM};