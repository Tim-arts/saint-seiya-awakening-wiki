const express = require('express');
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const getJSON = require("get-json");

// Import dependencies
const helpers = require("./_helpers");

// Import model
const Skills = require("./../../../fixtures/models/skills");

module.exports = function () {
    // Route: /back/update-skill/:id
    router.get('/update-skill/:id', function(req, res) {
        if (req.params.id && req.params.id.length === 37) {
            const _id = req.params.id.substring(1);
    
            Skills.findOne({
                _id: _id
            }, (err, skill) => {
                if (skill) {
                    cloudinary.api.resources({
                        public_ids: ".json",
                        prefix: "translations/skills/" + skill.slug + "/",
                        resource_type: "raw",
                        type: "upload",
                        max_results: 2
                    }, (error, result) => {
                        if (error) {
                            console.log(error);
                
                            return res.render("back/views/edit-skill", {
                                skill: skill,
                                locales: null
                            });
                        }
            
                        if (result) {
                            (async function () {
                                res.render("back/views/edit-skill", {
                                    skill: await helpers.getSkillsModified(Skills, skill),
                                    locales: await helpers.getLocales(getJSON, result)
                                });
                            })();
                        }
                    });
                } else {
                    res.render("No skill to edit!");
                }
            });
        } else {
            res.json({
                error: "No :id!"
            });
        }
    });
    
    return router;
};
