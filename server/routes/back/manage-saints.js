const express = require('express');
const router = express.Router();

// Import model
const Saints = require("./../../../fixtures/models/saints");

module.exports = function () {
    // Route: /back/manage-saints
    router.get('/manage-saints', function(req, res) {
        Saints.find({}, (err, saints) => {
            res.render("back/views/manage-saints", {
                saints: saints
            });
        });
    });
    
    return router;
};
