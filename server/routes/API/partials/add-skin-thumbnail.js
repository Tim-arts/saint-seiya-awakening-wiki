const express = require('express');
const router = express.Router();

module.exports = function () {
    // Route: /api/partials/add-skin-thumbnail
    router.post('/partials/add-skin-thumbnail', function (req, res) {
        res.render("back/modules/partials/add-skin-thumbnail", {
            starter: req.body.starter,
            skin: req.body.skin
        });
    });
    
    return router;
};
