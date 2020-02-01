const fs = require("fs");
const http = require('http');
const path = require("path");
const cloudinary = require("cloudinary").v2;

// Import dependencies
const helpers = require("./_helpers");

module.exports = (Model, type) => {
    return {
        create: function (req, res) {
            let data = req.body.data;
        
            /* Upload new cosmo image on CDN */
            helpers.uploadFileIntoCDN(cloudinary, {
                file: data.image,
                public_id: data.slug,
                folder: global.utils.translations[type].path,
                allowed_formats: "jpeg,jpg,png",
            });
        
            /* Upload translation files on CDN */
            helpers.process(cloudinary, fs, http, path, data, global.utils.translations[type].cdn, global.utils.translations[type].singular, global.utils.translations[type].plural);
        
            /* Create the new document into database */
            Model.create(helpers.formatData(data, global.utils.translations[type].singular, global.utils.translations[type].plural), (error, document) => {
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
        },
    
        update: function (req, res) {
            let data = req.body.data;
        
            /* Update cosmo image on CDN */
            helpers.uploadFileIntoCDN(cloudinary, {
                file: data.image,
                public_id: data.slug,
                folder: global.utils.translations[type].path,
                allowed_formats: "jpeg,jpg,png",
            });
        
            /* Upload translation files on CDN */
            helpers.process(cloudinary, fs, http, path, data, global.utils.translations[type].cdn, global.utils.translations[type].singular, global.utils.translations[type].plural);
        
            /* Update the document into database */
            Model.updateOne(
                {
                    _id: data._id
                },
                helpers.formatData(data, global.utils.translations[type].singular, global.utils.translations[type].plural),
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
        },
    
        delete: function (req, res) {
            let data = req.body.data;
        
            /* Delete cosmo image from CDN */
            helpers.deleteFileFromCDN(cloudinary, {
                file: global.utils.translations[type].path + data.slug,
                resource_type: "image"
            });
        
            // Delete translations from CDN
            helpers.deleteFileFromCDN(cloudinary, {
                file: global.utils.translations[type].cdn + data.slug + "/en.json",
                resource_type: "raw"
            });
            helpers.deleteFileFromCDN(cloudinary, {
                file: global.utils.translations[type].cdn + data.slug + "/fr.json",
                resource_type: "raw"
            });
            helpers.deleteFolderFromCDN(cloudinary, (global.utils.translations[type].cdn + data.slug));
        
            /* Delete translations from i18n files (local system) */
            helpers.deleteTranslations(fs, data, global.utils.translations[type].plural);
        
            /* Remove the new document from collection */
            Model.deleteOne({
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
        }
    }
};
