module.exports = (schemas) => {
    const schemasToModels = (schemas) => {
        let models = {};
        
        for (let schema in schemas) {
            let name = schemas[schema]["name"];
            models[name] = require("./setModel")(schemas[schema]);
        }
        
        return models;
    };
    
    return require("./../server/config-db")(schemasToModels(schemas));
};