const express = require('express');
const router = express.Router();

const Cosmos = require("../../../fixtures/models/cosmos");

module.exports = function () {
    // Middleware
    router.use(function (req, res, next) {
        next();
    });
    
    // Route: /cosmos
    router.get('/', function(req, res) {
        res.redirect("front/views/cosmos/show");
    });
    
    // Route: /cosmos/show
    router.get('/show', function(req, res) {
        res.send("cosmos");
    });
    
    // Route: cosmos/show/:id
    router.get('/show/:id', function(req, res) {
        res.send("id!");
    });
    
    return router;
};
