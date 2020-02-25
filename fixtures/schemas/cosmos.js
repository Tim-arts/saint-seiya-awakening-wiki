const cosmos = {
    name: "cosmos",
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
        cn_exclusive: Boolean
    }
};

module.exports = cosmos;
