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
        slug_underscore: {
            type: String,
            unique: true
        },
        comment: String,
        rank: String,
        damage_type: String,
        focus: String,
        roles: {
            type: Array,
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
                "solar": Array,
                "lunar": Array,
                "star": Array,
                "legendary": Array,
                "comments": String
            }
        ],
        skills_suggestions: [
            {
                "priorities": Array,
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
