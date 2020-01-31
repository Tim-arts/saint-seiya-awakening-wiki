const express = require('express');
const router = express.Router();

// Require controllers modules
const cosmo_controller = require("./controllers/Cosmo");

module.exports = function () {
    // Route: /back/cosmo/create
    router.post('/cosmo/create', cosmo_controller.cosmo_create);
    
    // Route: /back/cosmo/delete
    router.post('/cosmo/delete', cosmo_controller.cosmo_delete);
    
    // Route: /back/cosmo/update
    router.post('/cosmo/update', cosmo_controller.cosmo_update);
    
    return router;
};
