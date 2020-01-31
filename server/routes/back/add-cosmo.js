const express = require('express');
const router = express.Router();

module.exports = function () {
    // Route: /back/add-cosmo
    router.get('/add-cosmo', function(req, res) {
        const attributes = require("./../../../fixtures/data/modules/cosmos-attributes");
        const types = require("./../../../fixtures/data/modules/cosmos-types");
        const bonuses = require("./../../../fixtures/data/modules/cosmos-bonuses");
        const systems = require("./../../../fixtures/data/modules/cosmos-systems");
        
        res.render("back/views/add-cosmo", {
            attributes: attributes,
            types: types,
            bonuses: bonuses,
            systems: systems
        });
    });
    
    return router;
};
