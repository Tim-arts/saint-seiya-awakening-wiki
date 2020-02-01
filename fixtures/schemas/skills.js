const skills = {
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
        slug_underscore: {
            type: String,
            unique: true
        },
        description: {
            "main": String,
            "levels": {
                type: Array,
                minItems: 5,
                maxItems: 5
            }
        },
        cost: Number,
        linked_saint_id: String,
        awakening_skill_id: String
    }
};

module.exports = skills;
