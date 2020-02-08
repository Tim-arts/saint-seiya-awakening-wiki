const express = require('express');
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const getJSON = require("get-json");

// Import dependencies
const helpers = require("./_helpers");

// Import model
const Saints = require("./../../../fixtures/models/saints");

module.exports = function () {
    // Route: /back/update-saint/:id
    router.get('/update-saint/:id', function (req, res) {
        if (req.params.id && req.params.id.length === 37) {
            const _id = req.params.id.substring(1);
    
            Saints.findOne({
                _id: _id
            }, (err, saint) => {
                if (saint) {
                    cloudinary.api.resources({
                        public_ids: ".json",
                        prefix: "translations/saints/" + saint.slug + "/",
                        resource_type: "raw",
                        type: "upload",
                        max_results: 2
                    }, (error, result) => {
                        if (error) {
                            console.log(error);
    
                            res.render("back/views/edit-saint", {
                                saint: saint,
                                locales: null
                            });
                        }
                        
                        if (result) {
                            (async function render () {
                                res.render("back/views/edit-saint", {
                                    saint: saint,
                                    locales: await helpers.getLocales(getJSON, result)
                                });
                            })();
                        }
                    });
                } else {
                    res.render("No saint to edit!");
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
