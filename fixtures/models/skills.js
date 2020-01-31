const Schema = require("mongoose").Schema;
const data = {
    skills: require("./../schemas/skills")(Schema)
};
const Models = require("./../setSchemasToModels")(data);

module.exports = Models.models.skills;
