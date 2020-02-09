const roles = require("./saints-roles");

module.exports = () => {
    return {
        "focus": {
            "values": [
                "single",
                "multiple"
            ],
            "type": "checkbox"
        },
        "roles": {
            "values": roles,
            "type": "checkbox"
        },
        "type": {
            "values": [
                "physical",
                "cosmo"
            ],
            "type": "radio"
        },
        "rank": {
            "values": [
                "SS",
                "S",
                "A",
                "B"
            ],
            "type": "radio"
        }
    }
};
