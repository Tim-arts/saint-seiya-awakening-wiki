const fs = require("fs");
const http = require('http');
const path = require("path");
const cloudinary = require("cloudinary").v2;

// Import dependencies
const helpers = require("./_helpers");
const SkillModel = require("./../../../../fixtures/models/skills");

exports.skill_create = function (req, res) {
    let data = req.body.data;
    
    /* Upload new skill image on CDN */
    helpers.uploadFileIntoCDN(cloudinary, {
        file: data.image,
        public_id: data.slug,
        folder: global.utils.translations.skills.path,
        allowed_formats: "jpeg,jpg,png",
    });

    /* Upload translation files on CDN */
    helpers.process(cloudinary, fs, http, path, data, global.utils.translations.skills.cdn, global.utils.translations.skills.singular, global.utils.translations.skills.plural);
    
    /* Create the new document into database */
    SkillModel.create(helpers.formatData(data, global.utils.translations.skills.singular, global.utils.translations.skills.plural), (error, document) => {
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

exports.skill_update = function (req, res) {

};

exports.skill_delete = function (req, res) {

};
