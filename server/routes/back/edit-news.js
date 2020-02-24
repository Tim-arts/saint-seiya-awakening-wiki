const express = require('express');
const router = express.Router();

module.exports = function () {
    // Route: /back/edit-news
    router.get('/edit-news', function(req, res) {
        res.render("back/views/edit-news");
    });
    
    return router;
};
