const express = require('express');
const router = express.Router();

// Import model
const Cosmos = require("./../../../fixtures/models/cosmos");

module.exports = function () {
    // Route: /back/add-saint
    router.get('/add-saint', function(req, res) {
        const characteristics = require("./../../../fixtures/data/modules/saints-characteristics");
        const attributes = require("./../../../fixtures/data/modules/cosmos-attributes");
        const focus = require("./../../../fixtures/data/modules/saints-focus");
        const ranks = require("./../../../fixtures/data/modules/saints-ranks");
        const roles = require("./../../../fixtures/data/modules/saints-roles");
        const types = require("./../../../fixtures/data/modules/saints-types");
        const arayashiki = require("./../../../fixtures/data/modules/saints-arayashiki");
        const cosmosTypes = require("./../../../fixtures/data/modules/cosmos-types");
        
        Cosmos.find({}, (error, cosmos) => {
            if (error) console.log(error);
            if (cosmos) {
                res.render("back/views/add-saint", {
                    characteristics: characteristics,
                    attributes: attributes,
                    focus: focus,
                    ranks: ranks,
                    roles: roles,
                    types: types,
                    cosmos: cosmos,
                    arayashiki: arayashiki,
                    cosmosTypes: cosmosTypes
                });
            }
        });
    });
    
    return router;
};
