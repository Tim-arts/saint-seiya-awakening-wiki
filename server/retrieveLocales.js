const path = require("path");
const fs = require('fs');
const getJSON = require("get-json");

module.exports = (cloudinary) => {
    let translations = {};
    
    cloudinary.api.resources({
        prefix: global.utils.translations.cosmos.cdn,
        resource_type: "raw",
        type: "upload",
        max_results: 500
    }, function (error, results) {
        if (results) {
            for (let i = 0, count = results.resources.length; i < count; i++) {
                let result = results.resources[i],
                    data = {};
    
                data["name"] = result.public_id.split("/");
                data["name"] = data["name"][data["name"].length - 2];
                data.urls = (() => {
                    let url = result.url.slice(0, -7);
                    
                    return {
                        en: url + "en.json",
                        fr: url + "fr.json"
                    }
                })();
    
                translations[[data["name"]]] = data;
            }
            
            for (let translation in translations) {
                let enFileName = (global.utils.dirPath + "locales/data/cosmos/" + translations[translation].name + "/en.json").replace(/\\/g,"/"),
                    frFileName = (global.utils.dirPath + "locales/data/cosmos/" + translations[translation].name + "/fr.json").replace(/\\/g,"/");

                process(translations[translation].urls.en, enFileName);
                process(translations[translation].urls.fr, frFileName);
            }
        }
    });
    
    function process (url, filePath) {
        let dataFromLocalFile;
        
        // Create file if it doesn't exist
        if (!fs.existsSync(filePath)) {
            let content = "{}";
    
            fs.mkdirSync(path.dirname(filePath), {recursive: true});
            fs.writeFileSync(filePath, content, null, 4);
            dataFromLocalFile = content;
        } else {
            // Store content from locale translation
            dataFromLocalFile = fs.readFileSync(filePath);
            dataFromLocalFile = JSON.stringify(JSON.parse(dataFromLocalFile));
        }
    
        // Process content from remote translation
        getJSON(url, function(error, response) {
            if (response) {
                let responseStringified = JSON.stringify(response);
            
                if (dataFromLocalFile !== responseStringified) {
                    fs.writeFileSync(filePath, JSON.stringify(response, null, 4));
                }
            }
        });
    }
};
