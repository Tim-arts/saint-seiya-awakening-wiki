const express = require('express');
const router = express.Router();

const cosmos = require("./../../../fixtures/data/cosmos");

module.exports = function () {
    // Middleware
    router.use(function (req, res, next) {
        next();
    });
    
    // Route: /api/cosmos
    router.get('/cosmos', function(req, res) {
        res.json(cosmos);
    });
    
    return router;
};
