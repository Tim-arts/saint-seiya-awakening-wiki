const cosmos = {
    name: "cosmos",
    template: {
        _id: String,
        name: {
            type: String,
            unique: true
        },
        description: String,
        comment: String,
        slug: {
            type: String,
            unique: true
        },
        slug_underscore: {
            type: String,
            unique: true
        },
        basic_attributes: {
            types: {
                type: Array,
                minItems: 2,
                maxItems: 2
            },
            values: {
                SS: {
                    level_10: {
                        type: Array,
                        minItems: 2,
                        maxItems: 2
                    }
                },
                S: {
                    level_10: {
                        type: Array,
                        minItems: 2,
                        maxItems: 2
                    }
                }
            }
        },
        bonus_attributes: {
            type: {type: String},
            value: String
        },
        type: {type: String},
        obtainment_system: {
            shrine: {
                type: Array,
                minItems: 1,
                maxItems: 7
            },
            titans: {
                type: Array,
                minItems: 1,
                maxItems: 7
            },
            shop: Boolean
        },
        exclusive_cn: Boolean
    }
};

module.exports = cosmos;
