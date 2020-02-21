const gulp = require("gulp");
const merge = require("gulp-merge-json");

let languages = global.utils.locales.languages.map(a => a.id);

function updateLocales () {
    languages.forEach((language) => {
        gulp.src(global.utils.dirPath + "locales/**/" + language + ".json")
            .pipe(merge({
                "fileName": language + ".json"
            }))
            .pipe(gulp.dest(global.utils.dirPath + "locales"));
    });
}

module.exports = () => {
    updateLocales();
    
    return languages;
};
