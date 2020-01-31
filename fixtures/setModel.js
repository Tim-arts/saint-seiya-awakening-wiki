const mongoose = require("mongoose");

module.exports = (schema) => {
    if (mongoose.models[schema.name]) {
        return mongoose.models[schema.name];
    } else {
        return mongoose.model(schema.name, new mongoose.Schema(schema.template), schema.name);
    }
};