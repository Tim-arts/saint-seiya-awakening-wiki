const saints = {
    name: "saints",
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
        comment: String,
        rank: String,
        damage_type: String,
        focus: String,
        roles: {
            type: String,
            maxItems: 8
        },
        main_skills: {
            type: Array,
            maxItems: 4
        },
        additional_skills: Array,
        cosmos_suggestions: [
            {
                "template_name": String,
                "legendary": String,
                "lunar": String,
                "solar": String,
                "star": String,
                "comments": String
            }
        ],
        skills_suggestions: [
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
