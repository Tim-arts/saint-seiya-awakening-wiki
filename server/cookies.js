const cookieParser = require("cookie-parser");

module.exports = (router, i18n) => {
    router.use(function (req, res, next) {
        global.utils.locales.language = (function () {
            let locale;
        
            if (!req.cookies.lang || global.utils.locales.languages.map(a => a.id).indexOf(req.cookies.lang) === -1) {
                locale = i18n.getLocale();
                res.cookie("lang", locale);
            } else {
                locale = req.cookies.lang;
            }
        
            return locale;
        })();
    
        return next();
    });
    
    return cookieParser;
};
