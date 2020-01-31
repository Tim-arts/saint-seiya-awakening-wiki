const express = require('express');
const router = express.Router();

module.exports = function () {
    // Route: /back/add-saint
    router.get('/add-saint', function(req, res) {
        res.render("back/views/add-saint");
    });
    
    return router;
};
