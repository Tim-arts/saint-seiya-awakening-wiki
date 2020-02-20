const express = require('express');
const router = express.Router();

module.exports = function () {
    // Route: /api/partials/add-skin-thumbnail
    router.post('/partials/add-skin-thumbnail', function (req, res) {
        res.render("back/modules/partials/add-skin-thumbnail", {
            index: req.body.index,
            starter: req.body.starter,
            img: req.body.img
        });
    });
    
    return router;
};
