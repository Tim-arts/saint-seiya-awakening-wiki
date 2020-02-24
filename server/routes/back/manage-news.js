const express = require('express');
const router = express.Router();

// Import model
const News = require("./../../../fixtures/models/news");

module.exports = function () {
    // Route: /back/manage-news
    router.get('/manage-news', function(req, res) {
        News.find({}, (err, news) => {
            res.render("back/views/manage-news", {
                news: news
            });
        });
    });
    
    return router;
};
