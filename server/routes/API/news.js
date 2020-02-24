const express = require('express');
const router = express.Router();

const news = require("./../../../fixtures/data/news");

module.exports = function () {
    // Middleware
    router.use(function (req, res, next) {
        next();
    });
    
    // Route: /api/cosmos
    router.get('/news', function(req, res) {
        res.json(news);
    });
    
    return router;
};
