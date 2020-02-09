const express = require('express');
const router = express.Router();

module.exports = function () {
    // Route: /back/add-saint
    router.get('/add-saint', function(req, res) {
        const characteristics = require("./../../../fixtures/data/modules/saints-characteristics");
        const focus = require("./../../../fixtures/data/modules/saints-focus");
        const ranks = require("./../../../fixtures/data/modules/saints-ranks");
        const roles = require("./../../../fixtures/data/modules/saints-roles");
        const types = require("./../../../fixtures/data/modules/saints-types");
        const levels = require("./../../../fixtures/data/modules/saints-levels");
        
        res.render("back/views/add-saint", {
            characteristics: characteristics,
            focus: focus,
            ranks: ranks,
            roles: roles,
            types: types,
            levels: levels
        });
    });
    
    return router;
};
