const express = require('express');
const router = express.Router();

// Import dependencies
const helpers = require("./_helpers");

// Import model
const Skills = require("./../../../fixtures/models/skills");
const Saints = require("./../../../fixtures/models/saints");

module.exports = function () {
    // Route: /back/update-skill/:id
    router.get('/update-skill/:id', function(req, res) {
        if (req.params.id && req.params.id.length === 37) {
            const _id = req.params.id.substring(1);
    
            Skills.findOne({
                _id: _id
            }, (error, skill) => {
                if (error) console.log(error);
                if (skill) {
                    (async function () {
                        res.render("back/views/edit-skill", {
                            awakening_skill: await helpers.getAwakeningSkill(Skills, skill),
                            linked_saint: await helpers.getLinkedSaint(Saints, skill),
                            skill: await helpers.getSkillsModified(Skills, skill)
                        });
                    })();
                } else {
                    res.render("No skill to edit!");
                }
            });
        } else {
            res.json({
                error: "No :id!"
            });
        }
    });
    
    return router;
};
