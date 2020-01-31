const express = require('express');
const router = express.Router();

// Import model
const Cosmos = require("./../../../fixtures/models/cosmos");

module.exports = function () {
    // Route: /back/manage-cosmos
    router.get('/manage-cosmos', function(req, res) {
        Cosmos.find({}, (err, cosmos) => {
            res.render("back/views/manage-cosmos", {
                cosmos: cosmos
            });
        });
    });
    
    return router;
};
