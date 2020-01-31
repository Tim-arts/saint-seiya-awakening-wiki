const fs = require("fs");
const http = require('http');
const path = require("path");
const cloudinary = require("cloudinary").v2;

// Import helpers
const helpers = require("./_helpers");

// Import model
const CosmoModel = require("./../../../../fixtures/models/cosmos");

// Define string to locate folders, names, ...
const STATIC_COSMOS = global.utils.translations.cosmos.default;
const STATIC_TRANSLATIONS = global.utils.translations.cosmos.cdn;

exports.cosmo_create = function (req, res) {
    let data = req.body.data;
    
    /* Upload new cosmo image on CDN */
    helpers.uploadFileIntoCDN(cloudinary, {
        file: data.image,
        public_id: data.slug,
        folder: STATIC_COSMOS,
        allowed_formats: "jpeg,jpg,png",
    });

    /* Upload translation files on CDN */
    helpers.uploadTranslations(cloudinary, fs, http, path, data, STATIC_TRANSLATIONS);
    
    /* Create the new document into database */
    CosmoModel.create(helpers.formatData(data), (error, document) => {
        if (error) {
            console.log(error);
            res.json({
                error: true,
                data: JSON.stringify(error)
            });
        }

        if (document) {
            // console.log(document);
            res.json({
                success: true,
                data: JSON.stringify(document)
            });
        }
    });
};

exports.cosmo_update = function (req, res) {
    let data = req.body.data;
    
    /* Update cosmo image on CDN */
    helpers.uploadFileIntoCDN(cloudinary, {
        file: data.image,
        public_id: data.slug,
        folder: STATIC_COSMOS,
        allowed_formats: "jpeg,jpg,png",
    });

    /* Upload translation files on CDN */
    helpers.uploadTranslations(cloudinary, fs, http, path, data, STATIC_TRANSLATIONS);
    
    /* Update the document into database */
    CosmoModel.updateOne(
        {
            _id: data._id
        },
            helpers.formatData(data),
        {
            upsert: true
        },
        (error, document) => {
        if (error) {
            console.log(error);
            res.json({
                error: true,
                data: JSON.stringify(error)
            });
        }

        if (document) {
            // console.log(document);
            res.json({
                success: true,
                data: JSON.stringify(document)
            });
        }
    });
};

exports.cosmo_delete = function (req, res) {
    let data = req.body.data;
    
    /* Delete cosmo image from CDN */
    helpers.deleteFileFromCDN(cloudinary, {
        file: STATIC_COSMOS + data.slug,
        resource_type: "image"
    });
    
    // Delete translations from CDN
    helpers.deleteFileFromCDN(cloudinary, {
        file: STATIC_TRANSLATIONS + data.slug + "/en.json",
        resource_type: "raw"
    });
    helpers.deleteFileFromCDN(cloudinary, {
        file: STATIC_TRANSLATIONS + data.slug + "/fr.json",
        resource_type: "raw"
    });
    
    /* Delete translations from i18n files (local system) */
    helpers.deleteTranslations(fs, data, "cosmos");
    
    /* Remove the new document from collection */
    CosmoModel.deleteOne({
        _id: data._id
    }, (error, document) => {
        if (error) {
            console.log(error);
            res.json({
                error: true,
                data: JSON.stringify(error)
            });
        }
        
        if (document) {
            // console.log(document);
            res.json({
                success: true,
                data: JSON.stringify(document)
            });
        }
    });
};
