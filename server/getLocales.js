const path = require("path");
const fs = require('fs');
const getJSON = require("get-json");

const updateLocalesTranslationsFromCDN = require("./routes/back/_helpers").updateLocalesTranslationsFromCDN;

module.exports = (cloudinary) => {
    let types = [
        {
            cdn: global.utils.translations.cosmos.cdn,
            plural: global.utils.translations.cosmos.plural
        },
        {
            cdn: global.utils.translations.skills.cdn,
            plural: global.utils.translations.skills.plural
        },
        {
            cdn: global.utils.translations.saints.cdn,
            plural: global.utils.translations.saints.plural
        }
    ];
    
    // Update each locales type from types
    types.forEach((type) => {
        updateLocalesTranslationsFromCDN(cloudinary, fs, getJSON, path, type);
    });
};
