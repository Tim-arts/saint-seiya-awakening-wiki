const express = require('express');
const router = express.Router();

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
            }, (error, cosmo) => {
                if (error) console.log(error);
                if (cosmo) {
                    res.render("back/views/edit-cosmo", {
                        attributes: attributes,
                        types: types,
                        cosmo: cosmo,
                        systems: systems
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
