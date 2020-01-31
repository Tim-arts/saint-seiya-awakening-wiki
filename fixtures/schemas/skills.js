module.exports = (Schema) => {
    return {
        name: "skills",
        template: {
            _id: String,
            name: {
                type: String,
                unique: true
            },
            slug: {
                type: String,
                unique: true
            },
            slug_underscore: String,
            description: {
                "main": String,
                "levels": {
                    type: Array,
                    minItems: 5,
                    maxItems: 5
                }
            },
            saint_link: String,
            cost: Number,
            awakened_skill: Schema.Types.Mixed
        }
    }
};
