const languages = require("./updateLocales")();

module.exports = function (i18n) {
    i18n.configure({
        // setup some locales - other locales default to en silently
        locales: languages,
        // sets a custom cookie name to parse locale settings from
        cookie: 'lang',
        // where to store json files - defaults to './locales'
        directory: global.utils.dirPath + 'locales',
        autoReload: true,
        updateFiles: true
    });
    
    function init (req, res, next) {
        i18n.init(req, res);
        return next();
    }
    
    return init;
};
