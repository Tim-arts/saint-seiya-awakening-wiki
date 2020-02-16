const express = require('express');
const router = express.Router();

// Import model
const Saints = require("./../../../fixtures/models/saints");
const Cosmos = require("./../../../fixtures/models/cosmos");

module.exports = function () {
    // Route: /back/update-saint/:id
    router.get('/update-saint/:id', function (req, res) {
        const characteristics = require("./../../../fixtures/data/modules/saints-characteristics");
        const focus = require("./../../../fixtures/data/modules/saints-focus");
        const ranks = require("./../../../fixtures/data/modules/saints-ranks");
        const roles = require("./../../../fixtures/data/modules/saints-roles");
        const types = require("./../../../fixtures/data/modules/saints-types");
        const cosmosTypes = require("./../../../fixtures/data/modules/cosmos-types");
        
        if (req.params.id && req.params.id.length === 37) {
            const _id = req.params.id.substring(1);
    
            Saints.findOne({
                _id: _id
            }, (err, saint) => {
                if (saint) {
                    function getCosmos () {
                        return new Promise (resolve => {
                            Cosmos.find({}, (err, cosmos) => {
                                if (cosmos) {
                                    resolve(cosmos);
                                }
                            });
                        });
                    }
    
                    (async function render () {
                        res.render("back/views/edit-saint", {
                            characteristics: characteristics,
                            focus: focus,
                            ranks: ranks,
                            roles: roles,
                            types: types,
                            cosmosTypes: cosmosTypes,
                            saint: saint,
                            cosmos: await getCosmos()
                        });
                    })();
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
