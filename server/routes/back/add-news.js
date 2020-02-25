const express = require('express');
const router = express.Router();

module.exports = function () {
    // Route: /back/add-news
    router.get('/add-news', function(req, res) {
        const users = Object.keys(JSON.parse(process.env.USERS));
        
        res.render("back/views/add-news", {
            users: users
        });
    });
    
    return router;
};
