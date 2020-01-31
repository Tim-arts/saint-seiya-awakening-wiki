const express = require('express');
const router = express.Router();

const tags = require("./../../../fixtures/data/modules/search-tags");

module.exports = function () {
    // Middleware
    router.use(function (req, res, next) {
        next();
    });
    
    // Route: /api/tags
    router.get('/tags', function(req, res) {
        res.json(tags);
    });
    
    return router;
};
