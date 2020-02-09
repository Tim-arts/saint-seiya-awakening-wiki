const express = require('express');
const router = express.Router();

module.exports = function () {
    // Middleware
    router.use(function (req, res, next) {
        next();
    });
    
    // Route: /api/partials/add-skill-suggestion
    router.post('/partials/add-skill-suggestion', function (req, res) {
        res.render("back/modules/partials/_add-skill-suggestion", {
            index: req.body.index
        });
    });
    
    return router;
};
