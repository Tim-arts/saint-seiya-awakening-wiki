const express = require('express');
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const getJSON = require("get-json");

// Import dependencies
const helpers = require("./_helpers");

// Import model
const Cosmos = require("./../../../fixtures/models/cosmos");

module.exports = function () {
    // Route: /back/update-cosmo/:id
    router.get('/update-cosmo/:id', function (req, res) {
        const attributes = require("./../../../fixtures/data/modules/cosmos-attributes");
        const types = require("./../../../fixtures/data/modules/cosmos-types");
        const systems = require("./../../../fixtures/data/modules/cosmos-systems");
        
        if (req.params.id && req.params.id.length === 37) {
            const _id = req.params.id.substring(1);
    
            Cosmos.findOne({
                _id: _id
            }, (err, cosmo) => {
                if (cosmo) {
                    cloudinary.api.resources({
                        public_ids: ".json",
                        prefix: "translations/cosmos/" + cosmo.slug + "/",
                        resource_type: "raw",
                        type: "upload",
                        max_results: 2
                    }, (error, result) => {
                        if (error) {
                            console.log(error);
    
                            res.render("back/views/edit-cosmo", {
                                attributes: attributes,
                                types: types,
                                cosmo: cosmo,
                                systems: systems,
                                locales: null
                            });
                        }
                        
                        if (result) {
                            (async function render () {
                                res.render("back/views/edit-cosmo", {
                                    attributes: attributes,
                                    types: types,
                                    cosmo: cosmo,
                                    systems: systems,
                                    locales: await helpers.getLocales(getJSON, result)
                                });
                            })();
                        }
                    });
                } else {
                    res.render("No cosmo to edit!");
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
