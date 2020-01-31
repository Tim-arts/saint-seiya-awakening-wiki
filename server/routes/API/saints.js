const express = require('express');
const router = express.Router();

// Import model
const Saints = require("./../../../fixtures/models/saints");

module.exports = function () {
    // Middleware
    router.use(function (req, res, next) {
        next();
    });
    
    // Route: /api/saints
    router.post('/saints', function (req, res) {
        let data = req.body.data,
            regex = new RegExp(data, 'i');
        
        Saints.find({name: regex}, (err, saints) => {
            if (err) {
                res.json({
                    error: true,
                    data: "Please check the logs for MongoDB error"
                });
            }
            
            if (saints) {
                res.json({
                    success: true,
                    data: saints
                });
            }
        });
    });
    
    // Route: /api/saints/:id
    router.get("/saints/:id", function(req, res) {
        Saints.find({"slug": req.params.id}, (err, saint) => {
            return res.json(saint[0]);
        });
    });
    
    return router;
};
