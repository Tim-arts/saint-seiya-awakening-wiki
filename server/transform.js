const fs = require("fs");
const browserify = require("browserify");

// Front files
browserify(["js/front/views/index.js"])
    .transform("babelify")
    .bundle()
    .pipe(fs.createWriteStream(global.utils.dirPath + "public/dist/front/js/index.js"));

browserify(["js/front/views/saints/show.js"])
    .transform("babelify")
    .bundle()
    .pipe(fs.createWriteStream(global.utils.dirPath + "public/dist/front/js/saints/show.js"));

browserify(["js/back/views/index.js"])
    .transform("babelify")
    .bundle()
    .pipe(fs.createWriteStream(global.utils.dirPath + "public/dist/back/js/index.js"));

// Back files
browserify(["js/back/views/update-cosmo.js"])
    .transform("babelify")
    .bundle()
    .pipe(fs.createWriteStream(global.utils.dirPath + "public/dist/back/js/update-cosmo.js"));

browserify(["js/back/views/manage-cosmos.js"])
    .transform("babelify")
    .bundle()
    .pipe(fs.createWriteStream(global.utils.dirPath + "public/dist/back/js/manage-cosmos.js"));

browserify(["js/back/views/update-skill.js"])
    .transform("babelify")
    .bundle()
    .pipe(fs.createWriteStream(global.utils.dirPath + "public/dist/back/js/update-skill.js"));

browserify(["js/back/views/manage-skills.js"])
    .transform("babelify")
    .bundle()
    .pipe(fs.createWriteStream(global.utils.dirPath + "public/dist/back/js/manage-skills.js"));

module.exports = browserify;
