/* All these functions receives a formValue object containing the list of components (country,province,city,address)  having a boolean value defining
the presence of error and the error message to be shown  */

/* Erase the error and errorMessage for each value in formValue */
function ResetErrors(formValues) {
    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues }

    formFields.forEach(key => {
        newFormValues[key].error = false;
        newFormValues[key].errorMessage = "";
    });
    return newFormValues;
}

/* Set error=true and message= ... to the object in formValues having name = res (country,province,city,address) */
function PrintCheckErrors(formValues, res) {
    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues }

    formFields.forEach(key => {
        if (key === res) {
            newFormValues[key].error = true;
            newFormValues[key].errorMessage = key.charAt(0).toUpperCase() + key.slice(1) + " doesn't match with the location";
        } else {
            newFormValues[key].error = false;
            newFormValues[key].errorMessage = "";
        }
    });
    return newFormValues;
}

/* Set error=true and message= missing... to more objects in formValues having country,privince, city or address missing  */
function PrintMissingErrors(formValues, array) {
    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues }
    let index = 0;
    formFields.forEach(key => {
        if (array[index] === "" || array[index] === null) {
            newFormValues[key].error = true;
            newFormValues[key].errorMessage = key.charAt(0).toUpperCase() + key.slice(1) + " missing";
        } else {
            newFormValues[key].error = false;
            newFormValues[key].errorMessage = "";
        }
        index++;
    });
    return newFormValues;

}

module.exports = { ResetErrors, PrintCheckErrors, PrintMissingErrors };


