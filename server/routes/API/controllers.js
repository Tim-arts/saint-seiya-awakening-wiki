const express = require('express');
const router = express.Router();

// Require models
const CosmoModel = require("./../../../fixtures/models/cosmos");
const SkillModel = require("./../../../fixtures/models/skills");
const SaintModel = require("./../../../fixtures/models/saints");

// Require controllers modules
const cosmo_controller = require("./controllers/CUD")(CosmoModel, "cosmos");
const skill_controller = require("./controllers/CUD")(SkillModel,"skills");
const saint_controller = require("./controllers/CUD")(SaintModel, "saints");

module.exports = function () {
    // Route: /back/cosmo/create
    router.post('/cosmo/create', cosmo_controller.create);
    
    // Route: /back/cosmo/update
    router.post('/cosmo/update', cosmo_controller.update);
    
    // Route: /back/cosmo/delete
    router.post('/cosmo/delete', cosmo_controller.delete);
    
    // Route: /back/skill/create
    router.post('/skill/create', skill_controller.create);
    
    // Route: /back/skill/update
    router.post('/skill/update', skill_controller.update);
    
    // Route: /back/skill/delete
    router.post('/skill/delete', skill_controller.delete);
    
    // Route: /back/saint/create
    router.post('/saint/create', saint_controller.create);
    
    // Route: /back/saint/update
    router.post('/saint/update', saint_controller.update);
    
    // Route: /back/saint/delete
    router.post('/saint/delete', saint_controller.delete);
    
    return router;
};
