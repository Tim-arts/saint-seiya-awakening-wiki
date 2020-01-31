const express = require('express');
const router = express.Router();

module.exports = function () {
    // Middleware
    router.use(function (req, res, next) {
        next();
    });
    
    // Route: /install-game
    router.get('/', function(req, res) {
        res.render("front/views/install-game");
    });
    
    return router;
};
