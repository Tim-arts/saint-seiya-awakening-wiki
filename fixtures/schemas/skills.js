const skills = {
    name: "skills",
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
        type: {
            type: String
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
        skill_index: Number,
        cost: Number,
        linked_saint_id: String,
        awakening_skill_id: String,
        isPassive: Boolean,
        linked_modified_skills: Array
    }
};

module.exports = skills;
