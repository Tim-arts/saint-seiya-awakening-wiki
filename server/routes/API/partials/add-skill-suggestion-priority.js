const express = require("express");
const router = express.Router();

module.exports = function () {
    // Route: /api/partials/add-skill-suggestion-priority
    router.post("/partials/add-skill-suggestion-priority", function (req, res) {
        res.render("back/modules/partials/add-skill-suggestion-priority", {
            index: req.body.index,
            indexPriority: req.body.indexPriority
        });
    });
    
    return router;
};
