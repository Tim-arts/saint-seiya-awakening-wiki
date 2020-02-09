const express = require('express');
const router = express.Router();

module.exports = function () {
    // Route: /api/partials/autocomplete-suggestion
    router.post('/partials/autocomplete-suggestion', function (req, res) {
        res.render("back/modules/partials/autocomplete-suggestion", {
            name: req.body.name
        });
    });
    
    return router;
};
