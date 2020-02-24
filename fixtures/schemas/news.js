const news = {
    name: "news",
    template: {
        _id: String,
        _date: {
            type: "date"
        },
        _name: {
            type: String,
            unique: true
        },
        lastUpdateTime: {
            type: "date"
        },
        comment: String,
        slug: {
            type: String,
            unique: true
        },
        slug_underscore: {
            type: String,
            unique: true
        }
    }
};

module.exports = news;
