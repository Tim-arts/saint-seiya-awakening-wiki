const schema = {
    skills: require("./../schemas/skills")
};
const Models = require("./../setSchemasToModels")(schema);

module.exports = Models.models.skills;
