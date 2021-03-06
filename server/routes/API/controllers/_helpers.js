module.exports = {
    uploadFileIntoCDN (cloudinary, options) {
        if (!!options.file) {
            cloudinary.uploader.upload(options.file, {
                public_id: options.public_id,
                folder: options.folder,
                resource_type: options.resource_type,
                allowed_formats: options.allowed_formats
            }, function (error, result) {
                if (error) console.log(error);
            });
        }
    },
    deleteFileFromCDN (cloudinary, options) {
        if (!!options.file) {
            cloudinary.uploader.destroy(options.file, {
                resource_type: options.resource_type,
                invalidate: true
            }, function (error) {
                if (error) console.log(error);
            });
        }
    },
    deleteFolderFromCDN (cloudinary, folder) {
        cloudinary.api.delete_folder(folder, function (error) {
            if (error) console.log(error);
        });
    },
    deleteTranslations (fs, data, folder) {
        const localFolder = global.utils.dirPath + "locales/data/" + folder + "/" + data.slug;
        fs.rmdirSync(localFolder, {recursive: true});
    },
    uploadTranslations (cloudinary, enTranslation, frTranslation, folder) {
        let enData = Buffer.from(JSON.stringify(enTranslation)).toString("Base64");
        enData = "data:image/png;base64," + enData;
        let frData = Buffer.from(JSON.stringify(frTranslation)).toString("Base64");
        frData = "data:image/png;base64," + frData;
    
        /* Upload translations into CDN (remote) */
        this.uploadFileIntoCDN(cloudinary, {
            file: enData,
            public_id: "en.json",
            folder: folder,
            resource_type: "raw"
        });
        this.uploadFileIntoCDN(cloudinary, {
            file: frData,
            public_id: "fr.json",
            folder: folder,
            resource_type: "raw"
        });
    },
    process (cloudinary, fs, http, path, data, folder, singularType, pluralType) {
        // Shared entry
        let name = data.slug_underscore + "_" + singularType + "_name";
        let enTranslation = {},
            frTranslation = {},
            comment;
        
        switch (pluralType) {
            case "cosmos":
                let description = data.slug_underscore + "_" + singularType + "_description";
                comment = data.slug_underscore + "_" + singularType + "_comment";
    
                enTranslation[[name]] = data._name.en;
                enTranslation[[description]] = data.description.en;
                enTranslation[[comment]] = data.comment.en;
    
                frTranslation[[name]] = data._name.fr;
                frTranslation[[description]] = data.description.fr;
                frTranslation[[comment]] = data.comment.fr;
                
                break;
            case "skills":
                let mainDescription = data.slug_underscore + "_" + singularType + "_description_main";
    
                enTranslation[[name]] = data._name.en;
                enTranslation[[mainDescription]] = data.description.main.en;
    
                frTranslation[[name]] = data._name.fr;
                frTranslation[[mainDescription]] = data.description.main.fr;
                
                if (data.type === "main") {
                    let level_1 = data.slug_underscore + "_" + singularType + "_description_level_1",
                        level_2 = data.slug_underscore + "_" + singularType + "_description_level_2",
                        level_3 = data.slug_underscore + "_" + singularType + "_description_level_3",
                        level_4 = data.slug_underscore + "_" + singularType + "_description_level_4",
                        level_5 = data.slug_underscore + "_" + singularType + "_description_level_5";
    
                    enTranslation[[level_1]] = data.description.levels[0].en;
                    enTranslation[[level_2]] = data.description.levels[1].en;
                    enTranslation[[level_3]] = data.description.levels[2].en;
                    enTranslation[[level_4]] = data.description.levels[3].en;
                    enTranslation[[level_5]] = data.description.levels[4].en;
    
                    frTranslation[[level_1]] = data.description.levels[0].fr;
                    frTranslation[[level_2]] = data.description.levels[1].fr;
                    frTranslation[[level_3]] = data.description.levels[2].fr;
                    frTranslation[[level_4]] = data.description.levels[3].fr;
                    frTranslation[[level_5]] = data.description.levels[4].fr;
                }
                
                break;
            case "saints":
                comment = data.slug_underscore + "_" + singularType + "_comment";
    
                enTranslation[[name]] = data._name.en;
                enTranslation[[comment]] = data.comment.en;
                
                frTranslation[[name]] = data._name.fr;
                frTranslation[[comment]] = data.comment.fr;
                
                if (data.cosmos_suggestions) {
                    data.cosmos_suggestions.forEach((suggestion, i) => {
                        let template_name_suggestion = data.slug_underscore + "_" + singularType + "_template_name_suggestion_" + i,
                            comment_suggestion = data.slug_underscore + "_" + singularType + "_comment_cosmos_suggestion_" + i;
        
                        enTranslation[[template_name_suggestion]] = suggestion.template_name.en;
                        frTranslation[[template_name_suggestion]] = suggestion.template_name.fr;
        
                        enTranslation[[comment_suggestion]] = suggestion.comment.en;
                        frTranslation[[comment_suggestion]] = suggestion.comment.fr;
                    });
                }
                
                if (data.skills_suggestions) {
                    data.skills_suggestions.forEach((suggestion, i) => {
                        let comment_suggestion = data.slug_underscore + "_" + singularType + "_comment_skills_suggestion_" + i;
        
                        enTranslation[[comment_suggestion]] = suggestion.comment.en;
                        frTranslation[[comment_suggestion]] = suggestion.comment.fr;
                    });
                }
                
                if (data.skins && data.skins.length > 0) {
                    let skinFolder = "saints/" + data.slug + "/skins/";
                    
                    data.skins.forEach(skin => {
                        this.uploadFileIntoCDN(cloudinary, {
                            file: skin.img,
                            public_id: skin.name,
                            folder: skinFolder,
                            allowed_formats: "jpeg,jpg,png"
                        });
                    });
                }
                
                break;
            case "news":
                let post = data.slug_underscore + "_" + singularType + "_post";
    
                enTranslation[[name]] = data._name.en;
                frTranslation[[name]] = data._name.fr;
                
                enTranslation[[post]] = data.post.en;
                frTranslation[[post]] = data.post.fr;
                
                break;
            default:
                console.log("Type isn't recognized!");
        }
        
        folder += data.slug;
        
        /* Update the translations to the i18n files (local system) */
        const enFileName = global.utils.dirPath + "locales/data/" + pluralType + "/" + data.slug + "/en.json";
        const frFileName = global.utils.dirPath + "locales/data/" + pluralType + "/" + data.slug + "/fr.json";
        
        fs.promises.mkdir(path.dirname(enFileName), {recursive: true}).then(x => fs.promises.writeFile(enFileName, JSON.stringify(enTranslation, null, 4) + "\n", "utf8"));
        fs.promises.mkdir(path.dirname(frFileName), {recursive: true}).then(x => fs.promises.writeFile(frFileName, JSON.stringify(frTranslation, null, 4) + "\n", "utf8"));
        
        this.uploadTranslations(cloudinary, enTranslation, frTranslation, folder);
    },
    formatData (data, singularType, pluralType) {
        // If update, name has been removed because it's immutable
        if (data._name) {
            data._name = data.slug_underscore + "_" + singularType + "_name";
        }
        
        switch (pluralType) {
            case "cosmos":
                data.description = data.slug_underscore + "_" + singularType +"_description";
                data.comment = data.slug_underscore + "_" + singularType +"_comment";
                
                break;
            case "skills":
                data.description.main = data.slug_underscore + "_" + singularType + "_description_main";
                
                if (data.type === "main") {
                    for (let i = 0; i <= 4; i++) {
                        data.description.levels[i] = data.slug_underscore + "_" + singularType + "_description_level_" + (i + 1);
                    }
                }
                
                break;
            case "saints":
                data.comment = data.slug_underscore + "_" + singularType +"_comment";
    
                if (data.cosmos_suggestions) {
                    data.cosmos_suggestions.forEach((suggestion, i) => {
                        data.cosmos_suggestions[i].template_name = data.slug_underscore + "_" + singularType + "_template_name_suggestion_" + i;
                        data.cosmos_suggestions[i].comment = data.slug_underscore + "_" + singularType + "_comment_cosmos_suggestion_" + i;
                    });
                }
    
                if (data.skills_suggestions) {
                    data.skills_suggestions.forEach((suggestion, i) => {
                        data.skills_suggestions[i].comment = data.slug_underscore + "_" + singularType + "_comment_skills_suggestion_" + i;
                    });
                }
                
                break;
            case "news":
                data.post = data.slug_underscore + "_" + singularType + "_post";
                
                break;
            default:
                console.log("Type isn't recognized!");
        }
        
        return data;
    }
};
