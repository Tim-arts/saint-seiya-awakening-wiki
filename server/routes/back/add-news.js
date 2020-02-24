const express = require('express');
const router = express.Router();

module.exports = function () {
    // Route: /back/add-news
    router.get('/add-news', function(req, res) {
        res.render("back/views/add-news");
    });
    
    return router;
};
