const schema = {
    cosmos: require("./../schemas/cosmos")
};
const Models = require("./../setSchemasToModels")(schema);

module.exports = Models.models.cosmos;
