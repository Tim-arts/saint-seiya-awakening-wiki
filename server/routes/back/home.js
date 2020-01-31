const basicAuth = require('express-basic-auth');
const staticUserAuth = basicAuth({
    users: JSON.parse(process.env.USERS),
    challenge: true
});

module.exports = function (router) {
    // Middleware
    router.use("/back", staticUserAuth, function (req, res, next) {
        next();
    });
    
    // Route: /back/
    router.get('/back', function(req, res) {
        res.render("back/views/index");
    });
    
    return router;
};
