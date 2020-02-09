const express = require("express");
const router = express.Router();

// Get dynamic data from DB
const Saints = require("./../../../fixtures/models/saints");

module.exports = function () {
    // Middleware
    router.use(function (req, res, next) {
        next();
    });
    
    // Route: /saints
    router.get("/", function(req, res) {
        res.redirect("/saints/show");
    });
    
    // Route: /saints/show
    router.get("/show", function(req, res) {
        let tags = require("./../../../fixtures/data/modules/search-tags")();
        
        Saints.find({}, (err, saints) => {
            res.render("front/views/saints/show", {
                saints: saints,
                tags: tags
            });
        }).limit(10);
    });
    
    // Route: /saints/show/:id
    router.get("/show/:id", function(req, res) {
        Saints.find({"slug": req.params.id}, (err, saint) => {
            res.render("front/views/saints/read", {
                saint: saint[0]
            });
        });
    });
    
    return router;
};
