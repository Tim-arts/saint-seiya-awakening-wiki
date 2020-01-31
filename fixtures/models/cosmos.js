const data = {
    cosmos: require("./../schemas/cosmos")
};
const Models = require("./../setSchemasToModels")(data);

module.exports = Models.models.cosmos;
