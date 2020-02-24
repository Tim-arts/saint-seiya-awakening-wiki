const schema = {
    news: require("./../schemas/news")
};
const Models = require("./../setSchemasToModels")(schema);

module.exports = Models.models.news;
