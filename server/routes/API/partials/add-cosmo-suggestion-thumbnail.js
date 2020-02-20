const express = require('express');
const router = express.Router();

module.exports = function () {
    // Route: /api/partials/add-cosmo-suggestion-thumbnail
    router.post('/partials/add-cosmo-suggestion-thumbnail', function (req, res) {
        res.render("back/modules/partials/add-cosmo-suggestion-thumbnail", {
            index: req.body.index,
            type: req.body.type,
            slug: req.body.slug
        });
    });
    
    return router;
};
