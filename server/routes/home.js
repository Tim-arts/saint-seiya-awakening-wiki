module.exports = function (router, cloudinary) {
    // Middleware
    router.use(function (req, res, next) {
        res.locals.cloudinary = cloudinary;
        next();
    });
    
    return router;
};
