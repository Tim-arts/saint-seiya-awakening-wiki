const express = require('express');
const router = express.Router();

/* Import model */
const Cosmos = require("./../../../../fixtures/models/cosmos");

module.exports = function () {
    // Route: /api/partials/generate-modal
    router.post('/partials/generate-modal', function (req, res) {
        Cosmos.find({
            type: req.body.type
        }, (err, cosmos) => {
            res.render("back/modules/partials/generate-modal", {
                modal: {
                    title: req.body.modal.title,
                    id: req.body.modal.id,
                    submitId: req.body.modal.submitId
                },
                elements: cosmos,
                type: req.body.type,
                selectedElements: req.body.selectedElements
            });
        });
    });
    
    return router;
};
