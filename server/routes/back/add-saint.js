const express = require('express');
const router = express.Router();

// Import model
const Cosmos = require("./../../../fixtures/models/cosmos");

module.exports = function () {
    // Route: /back/add-saint
    router.get('/add-saint', function(req, res) {
        const characteristics = require("./../../../fixtures/data/modules/saints-characteristics");
        const focus = require("./../../../fixtures/data/modules/saints-focus");
        const ranks = require("./../../../fixtures/data/modules/saints-ranks");
        const roles = require("./../../../fixtures/data/modules/saints-roles");
        const types = require("./../../../fixtures/data/modules/saints-types");
        const levels = require("./../../../fixtures/data/modules/saints-levels");
        const cosmosTypes = require("./../../../fixtures/data/modules/cosmos-types");
        
        Cosmos.find({}, (err, cosmos) => {
            if (err) {
                res.render("back/views/add-saint", {
                    characteristics: characteristics,
                    focus: focus,
                    ranks: ranks,
                    roles: roles,
                    types: types,
                    levels: levels,
                    cosmosTypes: cosmosTypes
                });
            }
            
            if (cosmos) {
                res.render("back/views/add-saint", {
                    characteristics: characteristics,
                    focus: focus,
                    ranks: ranks,
                    roles: roles,
                    types: types,
                    levels: levels,
                    cosmos: cosmos,
                    cosmosTypes: cosmosTypes
                });
            }
        });
    });
    
    return router;
};
