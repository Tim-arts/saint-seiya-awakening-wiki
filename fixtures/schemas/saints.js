const saints = {
    name: "saints",
    template: {
        _id: String,
        name: {
            type: String,
            unique: true
        },
        comment: String,
        slug: {
            type: String,
            unique: true
        },
        rank: {
            type: String,
            uppercase: true,
            required: true
        },
        damage_type: {
            type: String,
            lowercase: true,
            required: true
        },
        focus: {
            type: String,
            lowercase: true,
            required: true
        },
        roles: {
            type: String,
            minItems: 1,
            maxItems: 7,
            lowercase: true,
            required: true
        },
        cosmos_suggestion: [
            {
                "legendary": {
                    type: String,
                    required: true
                },
                "lunar": {
                    type: String,
                    required: true
                },
                "solar": {
                    type: String,
                    required: true
                },
                "star": {
                    type: String,
                    required: true
                },
                "template": String,
                "comment": String
            }
        ],
        main_skills: {
            type: Array,
            minItems: 3,
            maxItems: 4,
            required: true
        },
        additional_skills: Array,
        skill_suggestions: [
            {
                "priority": Array,
                "comment": String
            }
        ],
        characteristics: {
            80: {
                "hp": String,
                "p.atk": String,
                "c.atk": String,
                "p.def": String,
                "c.def": String,
                "speed": String
            }
        }
    }
};

module.exports = saints;
