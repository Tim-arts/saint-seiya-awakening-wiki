const gulp = require("gulp");
const merge = require("gulp-merge-json");

let languages = global.utils.locales.languages.map(a => a.id);

languages.forEach((value) => {
    gulp.src(global.utils.dirPath + "locales/**/" + value + ".json")
        .pipe(merge({
            "fileName": value + ".json"
        }))
        .pipe(gulp.dest(global.utils.dirPath + "locales"));
});

module.exports = function (i18n) {
    i18n.configure({
        // setup some locales - other locales default to en silently
        locales: languages,
        // sets a custom cookie name to parse locale settings from
        cookie: 'lang',
        // where to store json files - defaults to './locales'
        directory: global.utils.dirPath + 'locales'
    });
    
    function init (req, res, next) {
        i18n.init(req, res);
        
        return next();
    }
    
    return init;
};
