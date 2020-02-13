const express = require('express');
const router = express.Router();

// Import data JSON
const types = require("./../../../../fixtures/data/modules/cosmos-types");

module.exports = function () {
    // Route: /api/partials/add-cosmos-suggestion
    router.post('/partials/add-cosmos-suggestion', function (req, res) {
        res.render("back/modules/partials/add-cosmos-suggestion", {
            index: req.body.index,
            starter: req.body.starter,
            elements: req.body.elements,
            cosmosTypes: types
        });
    });
    
    return router;
};
