module.exports = (options) => {
    const data = require("./data/_imports");
    const schemas = require("./schemas/_imports");

    const Mongoose = require("./setSchemasToModels")(schemas);
    const models = Mongoose.mongoose.models;

    if (options.emptyBase) {
        resetDB();
    }

    if (!options.emptyBase && options.autoLoad) {
        fillDB();
    }
    
    function resetDB () {
        let index = 0;
        
        for (let model in models) {
            let name = Object.keys(models)[index];
            index++;
    
            models[name].collection.deleteMany({}, (err, result) => {
                console.log(result);
            });
        }
    }

    function fillDB () {
        let index = 0;
        
        for (let model in models) {
            let name = Object.keys(models)[index];
            index++;

            models[name].collection.insertMany(data[name], {
                ordered: false,
                writeConcern: true
            }, function (err, status) {
                if (err) {
                    console.log(err);
                }
            });
        }
    }

    return Mongoose;
};
