const express = require('express');
const router = express.Router();

// Import model
const Skills = require("./../../../fixtures/models/skills");

module.exports = function () {
    // Route: /back/manage-skills
    router.get('/manage-skills', function(req, res) {
        Skills.find({}, (err, skills) => {
            res.render("back/views/manage-skills", {
                skills: skills
            });
        });
    });
    
    return router;
};
