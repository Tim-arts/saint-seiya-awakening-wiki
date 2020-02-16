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
                template_name: String,
                comment: String,
                elements: {
                    solar: Array,
                    lunar: Array,
                    star: Array,
                    legendary: Array,
                }
            }
        ],
        skills_suggestions: [
            {
                comment: String,
                priorities: Array
            }
        ],
        characteristics: Array,
        _date: Date.now()
    }
};

module.exports = saints;
