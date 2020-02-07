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
            }, function (error, result) {
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
        fs.rmdirSync(localFolder, { recursive: true });
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
        let enTranslation, frTranslation;
        
        switch (pluralType) {
            case "cosmos":
                let description = data.slug_underscore + "_" + singularType + "_description";
                
                enTranslation = {
                    [name]: data.name.en,
                    [description]: data.description.en
                };
                frTranslation = {
                    [name]: data.name.fr,
                    [description]: data.description.fr
                };
                
                break;
            case "skills":
                let mainDescription = data.slug_underscore + "_" + singularType + "_description_main";
                
                if (data.type === "standard") {
                    let level_1 = data.slug_underscore + "_" + singularType + "_description_level_1",
                        level_2 = data.slug_underscore + "_" + singularType + "_description_level_2",
                        level_3 = data.slug_underscore + "_" + singularType + "_description_level_3",
                        level_4 = data.slug_underscore + "_" + singularType + "_description_level_4",
                        level_5 = data.slug_underscore + "_" + singularType + "_description_level_5";
    
                    enTranslation[level_1] = data.description.levels[0].en;
                    enTranslation[level_2] = data.description.levels[1].en;
                    enTranslation[level_3] = data.description.levels[2].en;
                    enTranslation[level_4] = data.description.levels[3].en;
                    enTranslation[level_5] = data.description.levels[4].en;
    
                    frTranslation[level_1]= data.description.levels[0].fr;
                    frTranslation[level_2]= data.description.levels[1].fr;
                    frTranslation[level_3]= data.description.levels[2].fr;
                    frTranslation[level_4]= data.description.levels[3].fr;
                    frTranslation[level_5]= data.description.levels[4].fr;
                }
                
                enTranslation = {
                    [name]: data.name.en,
                    [mainDescription]: data.description.main.en
                };
                frTranslation = {
                    [name]: data.name.fr,
                    [mainDescription]: data.description.main.fr
                };
                
                break;
            case "saints":
                break;
            default:
                console.log("Type isn't recognized!");
        }
        
        folder += data.slug;
        
        /* Update the translations to the i18n files (local system) */
        const enFileName = global.utils.dirPath + "locales/data/" + pluralType + "/" + data.slug + "/en.json";
        const frFileName = global.utils.dirPath + "locales/data/" + pluralType + "/" + data.slug + "/fr.json";
        
        fs.promises.mkdir(path.dirname(enFileName), {recursive: true}).then(x => fs.promises.writeFile(enFileName, JSON.stringify(enTranslation, null, 4)));
        fs.promises.mkdir(path.dirname(frFileName), {recursive: true}).then(x => fs.promises.writeFile(frFileName, JSON.stringify(frTranslation, null, 4)));
        
        this.uploadTranslations(cloudinary, enTranslation, frTranslation, folder);
    },
    formatData (data, singularType, pluralType) {
        // Shared entry
        data.name = data.slug_underscore + "_" + singularType + "_name";
        
        switch (pluralType) {
            case "cosmos":
                data.description = data.slug_underscore + "_" + singularType +"_description";
                
                break;
            case "skills":
                data.description.main = data.slug_underscore + "_" + singularType + "_description_main";
                
                for (let i = 0; i <= 4; i++) {
                    data.description.levels[i] = data.slug_underscore + "_" + singularType + "_description_level_" + (i + 1);
                }
                
                break;
            case "saints":
                
                break;
            default:
                console.log("Type isn't recognized!");
        }
        
        delete data.image;
        return data;
    }
};
