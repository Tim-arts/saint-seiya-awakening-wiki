const express = require('express');
const router = express.Router();

// Import model
const Skills = require("./../../../fixtures/models/skills");

module.exports = function () {
    // Middleware
    router.use(function (req, res, next) {
        next();
    });
    
    // Route: /api/skills
    router.post('/skills', function (req, res) {
        let data = req.body.data,
            regex = new RegExp(data, 'i');
        
        Skills.find({name: regex}, (err, skills) => {
            if (err) {
                res.json({
                    error: true,
                    data: "Please check the logs for MongoDB error"
                });
            }
            
            if (skills) {
                res.json({
                    success: true,
                    data: skills
                });
            }
        });
    });
    
    return router;
};
