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
        rank: String,
        damage_type: String,
        focus: String,
        roles: {
            type: String,
            minItems: 1,
            maxItems: 7
        },
        cosmos_suggestion: [
            {
                "legendary": String,
                "lunar": String,
                "solar": String,
                "star": String,
                "template_name": String,
                "comment": String
            }
        ],
        main_skills: {
            type: Array,
            minItems: 3,
            maxItems: 4
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
