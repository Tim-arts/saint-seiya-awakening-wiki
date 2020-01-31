const express = require('express');
const router = express.Router();

module.exports = function () {
    // Route: /back/add-skill
    router.get('/add-skill', function(req, res) {
        res.render("back/views/add-skill");
    });
    
    return router;
};
