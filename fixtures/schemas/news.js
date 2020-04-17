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
        last_update_time: {
            type: "date"
        },
        post: String,
        slug: {
            type: String,
            unique: true
        },
        slug_underscore: {
            type: String,
            unique: true
        },
        user: String
    }
};

module.exports = news;
