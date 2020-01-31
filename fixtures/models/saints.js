const schema = {
    saints: require("./../schemas/saints")
};
const Models = require("./../setSchemasToModels")(schema);

module.exports = Models.models.saints;
