const express = require('express');
const router = express.Router();

module.exports = function () {
    // Route: /api/partials/linked-modified-skill
    router.post('/partials/linked-modified-skill', function (req, res) {
        res.render("back/modules/partials/linked-modified-skill", {
            _id: req.body._id,
            slug: req.body.slug,
            name: req.body.name
        });
    });
    
    return router;
};
