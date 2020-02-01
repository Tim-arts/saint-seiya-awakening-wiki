const fs = require("fs");
const http = require('http');
const path = require("path");
const cloudinary = require("cloudinary").v2;

// Import dependencies
const helpers = require("./_helpers");
const CosmoModel = require("./../../../../fixtures/models/cosmos");

exports.cosmo_create = function (req, res) {
    let data = req.body.data;
    
    /* Upload new cosmo image on CDN */
    helpers.uploadFileIntoCDN(cloudinary, {
        file: data.image,
        public_id: data.slug,
        folder: global.utils.translations.cosmos.path,
        allowed_formats: "jpeg,jpg,png",
    });

    /* Upload translation files on CDN */
    helpers.process(cloudinary, fs, http, path, data, global.utils.translations.cosmos.cdn, global.utils.translations.cosmos.singular, global.utils.translations.cosmos.plural);
    
    /* Create the new document into database */
    CosmoModel.create(helpers.formatData(data, global.utils.translations.cosmos.singular, global.utils.translations.cosmos.plural), (error, document) => {
        if (error) {
            console.log(error);
            res.json({
                error: true,
                data: JSON.stringify(error)
            });
        }

        if (document) {
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
        folder: global.utils.translations.cosmos.path,
        allowed_formats: "jpeg,jpg,png",
    });

    /* Upload translation files on CDN */
    helpers.process(cloudinary, fs, http, path, data, global.utils.translations.cosmos.cdn, global.utils.translations.cosmos.singular, global.utils.translations.cosmos.plural);
    
    /* Update the document into database */
    CosmoModel.updateOne(
        {
            _id: data._id
        },
            helpers.formatData(data, global.utils.translations.cosmos.singular, global.utils.translations.cosmos.plural),
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
        file: global.utils.translations.cosmos.path + data.slug,
        resource_type: "image"
    });
    
    // Delete translations from CDN
    helpers.deleteFileFromCDN(cloudinary, {
        file: global.utils.translations.cosmos.cdn + data.slug + "/en.json",
        resource_type: "raw"
    });
    helpers.deleteFileFromCDN(cloudinary, {
        file: global.utils.translations.cosmos.cdn + data.slug + "/fr.json",
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
            res.json({
                success: true,
                data: JSON.stringify(document)
            });
        }
    });
};
