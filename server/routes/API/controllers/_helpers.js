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
    uploadTranslations (cloudinary, fs, http, path, data, folder) {
        let cosmoName = data.slug_underscore + "_cosmo_name";
        let cosmoDescription = data.slug_underscore + "_cosmo_description";
        let enTranslation = {
            [cosmoName]: data.name.en,
            [cosmoDescription]: data.description.en
        };
        let frTranslation = {
            [cosmoName]: data.name.fr,
            [cosmoDescription]: data.description.fr
        };
        
        folder = folder + data.slug;
    
        /* Update the translations from the i18n files (local system) */
        const enFileName = global.utils.dirPath + "locales/data/cosmos/" + data.slug + "/en.json";
        const frFileName = global.utils.dirPath + "locales/data/cosmos/" + data.slug + "/fr.json";
        
        fs.promises.mkdir(path.dirname(enFileName), {recursive: true}).then(x => fs.promises.writeFile(enFileName, JSON.stringify(enTranslation, null, 4)));
        fs.promises.mkdir(path.dirname(frFileName), {recursive: true}).then(x => fs.promises.writeFile(frFileName, JSON.stringify(frTranslation, null, 4)));
        
        /* Update translations on CDN */
        let enData = Buffer.from(JSON.stringify(enTranslation)).toString("Base64");
        enData = "data:image/png;base64," + enData;
        let frData = Buffer.from(JSON.stringify(frTranslation)).toString("Base64");
        frData = "data:image/png;base64," + frData;
        
        /* Upload translations from the CDN (remote) */
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
    deleteTranslations (fs, data, folder) {
        const localFolder = global.utils.dirPath + "locales/data/" + folder + "/" + data.slug;
        fs.rmdirSync(localFolder, { recursive: true });
    },
    formatData (data) {
        let cosmoName = data.slug_underscore + "_cosmo_name";
        let cosmoDescription = data.slug_underscore + "_cosmo_description";
        
        data.name = cosmoName;
        data.description = cosmoDescription;
        delete data["image"];
        
        return data;
    }
};
