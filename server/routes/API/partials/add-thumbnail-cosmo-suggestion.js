const express = require('express');
const router = express.Router();

module.exports = function () {
    // Route: /api/partials/add-thumbnail-cosmo-suggestion
    router.post('/partials/add-thumbnail-cosmo-suggestion', function (req, res) {
        res.render("back/modules/partials/add-thumbnail-cosmo-suggestion", {
            index: req.body.index,
            type: req.body.type,
            slug: req.body.slug
        });
    });
    
    return router;
};
