const floatInputSanitizer = (inputToSanitize) => {
    // only decimals or . or -
    const newLngSanitized1 = inputToSanitize.replace(/[^\d.-]/g, '');
    // there could be only one .
    const splitDecimal = newLngSanitized1.split(".");
    let newLngSanitized2 = newLngSanitized1;
    if (splitDecimal.length > 1) {
        newLngSanitized2 = splitDecimal[0] + ".";
        splitDecimal.forEach((n, i) => i !== 0 ? newLngSanitized2 += n : null);
    }
    // - can be only at the beginning
    let newLngSanitized3 = newLngSanitized2;
    const minusPosition = newLngSanitized3.indexOf("-");
    if (minusPosition > 0) {
        // if minus is not at the beginning, remove all occurences
        newLngSanitized3 = newLngSanitized3.replaceAll('-', '')
    } else if (minusPosition === 0 && newLngSanitized3.indexOf("-", 1) > 0) {
        // if there is a minus at the beginning, delete any other 
        const splitMinus = newLngSanitized3.split("-");
        newLngSanitized3 = "-";
        splitMinus.forEach((n) => newLngSanitized3 += n);
    }
    // parseFloat for enforce sanitizing
    const inputSanitized = parseFloat(newLngSanitized3).toString();

    return inputSanitized;
}

const positiveIntegerSanitizer = (inputToSanitize) => {
    // only decimals 
    const inputOnlyDecimal = inputToSanitize.replace(/[^\d]/g, '');
    console.log(inputOnlyDecimal);

    const inputSanitized = parseInt(inputOnlyDecimal).toString();

    return inputSanitized;
}


export { floatInputSanitizer, positiveIntegerSanitizer };