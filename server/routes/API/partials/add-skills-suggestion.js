const express = require('express');
const router = express.Router();

module.exports = function () {
    // Route: /api/partials/add-skills-suggestion
    router.post('/partials/add-skills-suggestion', function (req, res) {
        res.render("back/modules/partials/add-skills-suggestion", {
            index: req.body.index,
            indexPriority: req.body.indexPriority
        });
    });
    
    return router;
};
