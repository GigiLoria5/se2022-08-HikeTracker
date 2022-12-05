
/**
 * 
 * @param {Float} hoursDecimal hours expressed in decimal format (ex. 5.15h)
 * @returns time in format hh:mm
 */
const decimalHoursToTime = (hoursDecimal) => {
    const totalMinutes = hoursDecimal * 60;
    const minutes = Math.floor(totalMinutes % 60);
    const hours = Math.floor(totalMinutes / 60);

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

const timeToHHMM = (t) => {
    const hh = Math.floor(t);
    const mm = (t - Math.floor(t)) * 60;
    return hh + ":" + mm.toFixed(0);
}

export { decimalHoursToTime, timeToHHMM };