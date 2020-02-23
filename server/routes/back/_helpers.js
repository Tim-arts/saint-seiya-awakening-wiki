module.exports = {
    updateLocalesTranslationsFromCDN (cloudinary, fs, getJSON, path, type) {
        cloudinary.api.resources({
            prefix: type.cdn,
            resource_type: "raw",
            type: "upload",
            max_results: 500
        }, function (error, results) {
            if (results) {
                let translations = {};
                
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
                    let enFileName = (global.utils.dirPath + "locales/data/" + type.plural + "/" + translations[translation].name + "/en.json").replace(/\\/g,"/"),
                        frFileName = (global.utils.dirPath + "locales/data/" + type.plural + "/" + translations[translation].name + "/fr.json").replace(/\\/g,"/");
                    
                    module.exports.processLocales(fs, getJSON, path, translations[translation].urls.en, enFileName);
                    module.exports.processLocales(fs, getJSON, path, translations[translation].urls.fr, frFileName);
                    
                    console.log("Updating " + type.plural);
                }
            }
        });
    },
    processLocales (fs, getJSON, path, url, filePath) {
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
    },
    getLocales (getJSON, result) {
        return Promise.all([
            (() => {
                let object = result.resources.find(o => o.public_id.indexOf("en") > -1);
                return getJSON(object.url, function(error, response) {
                    if (response) {
                        return JSON.stringify(response);
                    }
                });
            })(),
            (() => {
                let object = result.resources.find(o => o.public_id.indexOf("fr") > -1);
                return getJSON(object.url, function(error, response) {
                    if (response) {
                        return JSON.stringify(response);
                    }
                });
            })()
        ]);
    },
    getAwakeningSkill (Skills, skill) {
        return new Promise (resolve => {
            if (!skill.awakening_skill_id) {
                return resolve(skill);
            }
            
            Skills.findOne({
                _id: skill.awakening_skill_id
            }, (err, awakeningSkill) => {
                if (awakeningSkill) {
                    resolve(awakeningSkill);
                }
            });
        });
    },
    getLinkedSaint (Saints, skill) {
        return new Promise (resolve => {
            if (!skill.linked_saint_id) {
                return resolve(skill);
            }
    
            Saints.findOne({
                _id: skill.linked_saint_id
            }, (err, linkedSaint) => {
                if (linkedSaint) {
                    resolve(linkedSaint);
                }
            });
        });
    },
    getSkillsModified (Skills, skill) {
        return new Promise (resolve => {
            let count = skill.linked_modified_skills.length;
            
            if (count === 0 || !skill.linked_modified_skills[0]) {
                return resolve(skill);
            }
            
            for (let i = 0; i < count; i++) {
                Skills.findOne({
                    _id: skill.linked_modified_skills[i]
                }, (err, modifiedSkill) => {
                    if (modifiedSkill) {
                        skill.linked_modified_skills[i] = modifiedSkill;
                
                        if ((i + 1) === count) {
                            resolve(skill);
                        }
                    }
                });
            }
        });
    }
};
