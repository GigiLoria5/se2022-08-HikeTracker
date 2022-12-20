/**
 * 
 * @param {File} imageFile the image you want to validate as a file
 * @returns A true of Boolean type if the image is a jpeg or png format and has a maximum size of 10MB. An error string is returned if it is invalid.
 */
const isValidImage = (imageFile) => {
    if (!imageFile)
        return "File not loaded";

    const validFormats = ["image/jpeg", "image/png"];
    if (!validFormats.includes(imageFile.type)) {
        return "The uploaded file is not an image (.jpeg or .png format)";
    }
    const sizeKB = imageFile.size / 1024;
    if (sizeKB > 1024 * 10)
        return "The maximum allowed size is 10MB";

    return true;
}

module.exports = { isValidImage };