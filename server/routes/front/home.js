module.exports = function (router) {
    // Route: /
    router.get('/', function(req, res) {
        res.set('Cache-Control', 'public, max-age=31536000, s-maxage=31536000');
        res.render("front/views/index");
    });
    
    return router;
};
