const fs = require("fs-extra");

let source = "./node_modules/tinymce/skins/";
let destination = "./public/dist/js/back/views/skins/";

// Copy source folder to destination
fs.copy(source, destination, function (err) {
    if (err){
        return console.error(err)
    }
});
