const express = require('express');
const router = express.Router();

// Require controllers modules
const cosmo_controller = require("./controllers/Cosmo");
const skill_controller = require("./controllers/Skill");
// const saint_controller = require("./controllers/Saint");

module.exports = function () {
    // Route: /back/cosmo/create
    router.post('/cosmo/create', cosmo_controller.cosmo_create);
    
    // Route: /back/cosmo/update
    router.post('/cosmo/update', cosmo_controller.cosmo_update);
    
    // Route: /back/cosmo/delete
    router.post('/cosmo/delete', cosmo_controller.cosmo_delete);
    
    // Route: /back/cosmo/create
    router.post('/skill/create', skill_controller.skill_create);
    
    // Route: /back/cosmo/delete
    router.post('/skill/update', skill_controller.skill_update);
    
    // Route: /back/cosmo/update
    router.post('/skill/delete', skill_controller.skill_delete);
    
    return router;
};
