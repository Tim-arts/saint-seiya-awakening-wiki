const fs = require("fs");
const http = require('http');
const path = require("path");
const cloudinary = require("cloudinary").v2;

// Import dependencies
const helpers = require("./_helpers");
const updateLocales = require("./../../../updateLocales");

module.exports = (Model, type) => {
    return {
        create: function (req, res) {
            let data = req.body.data,
                folder = type === "saints" ? (global.utils.translations[type].path + data.slug + "/") : global.utils.translations[type].path,
                publicId = type === "saints" ? "portrait" : data.slug;
            
            /* Upload new image on CDN */
            helpers.uploadFileIntoCDN(cloudinary, {
                file: data.portrait,
                public_id: publicId,
                folder: folder,
                allowed_formats: "jpeg,jpg,png",
            });
    
            if (type === "saints") {
                if (data.extendedPortrait) {
                    helpers.uploadFileIntoCDN(cloudinary, {
                        file: data.extendedPortrait,
                        public_id: "extended-portrait",
                        folder: folder,
                        allowed_formats: "jpeg,jpg,png",
                    });
                }
        
                if (data.fullCharacter) {
                    helpers.uploadFileIntoCDN(cloudinary, {
                        file: data.fullCharacter,
                        public_id: "full-character",
                        folder: folder,
                        allowed_formats: "jpeg,jpg,png",
                    });
                }
            }
        
            /* Upload translation files and skins on CDN */
            helpers.process(cloudinary, fs, http, path, data, global.utils.translations[type].cdn, global.utils.translations[type].singular, global.utils.translations[type].plural);
            
            /* Create the new document into database */
            Model.create(helpers.formatData(data, global.utils.translations[type].singular, global.utils.translations[type].plural), (error, document) => {
                if (error) {
                    console.log(error);
                    return res.json({
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
    
            updateLocales();
        },
    
        update: function (req, res) {
            let data = req.body.data,
                folder = type === "saints" ? (global.utils.translations[type].path + data.slug + "/") : global.utils.translations[type].path,
                publicId = type === "saints" ? "portrait" : data.slug,
                removableFields = ["_date", "_name"];
            
            /* Update image on CDN */
            helpers.uploadFileIntoCDN(cloudinary, {
                file: data.portrait,
                public_id: publicId,
                folder: folder,
                allowed_formats: "jpeg,jpg,png",
            });
            
            if (type === "saints") {
                if (data.extendedPortrait) {
                    helpers.uploadFileIntoCDN(cloudinary, {
                        file: data.extendedPortrait,
                        public_id: "extended-portrait",
                        folder: folder,
                        allowed_formats: "jpeg,jpg,png",
                    });
                }
                
                if (data.fullCharacter) {
                    helpers.uploadFileIntoCDN(cloudinary, {
                        file: data.fullCharacter,
                        public_id: "full-character",
                        folder: folder,
                        allowed_formats: "jpeg,jpg,png",
                    });
                }
            }
        
            /* Upload translation files and skins on CDN */
            helpers.process(cloudinary, fs, http, path, data, global.utils.translations[type].cdn, global.utils.translations[type].singular, global.utils.translations[type].plural);
    
            // Remove fields to avoid an update on these specific field
            removableFields.forEach(field => {
                if (data[field]) delete data[field];
            });
            
            /* Update the document into database */
            Model.updateOne(
                {
                    _id: data._id
                },
                helpers.formatData(data, global.utils.translations[type].singular, global.utils.translations[type].plural),
                (error, document) => {
                    if (error) {
                        console.log(error);
                        return res.json({
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
    
            updateLocales();
        },
    
        delete: function (req, res) {
            let data = req.body.data,
                folder = type === "saints" ? (global.utils.translations[type].path + data.slug + "/") : global.utils.translations[type].path;
        
            /* Delete cosmo image from CDN */
            helpers.deleteFileFromCDN(cloudinary, {
                file: folder + data.slug,
                resource_type: "image"
            });
            
            if (type === "saints") {
                helpers.deleteFileFromCDN(cloudinary, {
                    file: folder + "large-avatar",
                    resource_type: "image"
                });
            }
        
            // Delete translations from CDN
            helpers.deleteFileFromCDN(cloudinary, {
                file: global.utils.translations[type].cdn + data.slug + "/en.json",
                resource_type: "raw"
            });
            helpers.deleteFileFromCDN(cloudinary, {
                file: global.utils.translations[type].cdn + data.slug + "/fr.json",
                resource_type: "raw"
            });
        
            /* Delete translations from i18n files (local system) */
            helpers.deleteTranslations(fs, data, global.utils.translations[type].plural);
            
            /* Remove the new document from collection */
            Model.deleteOne({
                _id: data._id
            }, (error, document) => {
                if (error) {
                    console.log(error);
                    return res.json({
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
