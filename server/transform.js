const fs = require("fs");
const browserify = require("browserify");
const folders = [
    "js/front/",
    "js/back/",
    
    "js/front/views/",
    "js/back/views/",
    
    "js/front/views/saints/"
];

folders.forEach(folder => {
    fs.readdirSync(folder, {withFileTypes: true})
        .filter(entry => !entry.isDirectory())
        .map(entry => entry.name)
        .forEach(file => {
            let currentFolder = "public/dist/" + folder;
            fs.mkdir(currentFolder, {recursive: true}, (err) => {
                if (err) throw err;
    
                browserify([folder + file])
                    .transform("babelify")
                    .bundle()
                    .pipe(fs.createWriteStream(global.utils.dirPath + currentFolder + file));
            });
    });
});
