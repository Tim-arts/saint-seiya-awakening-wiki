const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;

// On error
db.on("error", console.error.bind(console, "connection error:"));

module.exports = (models) => {
    return {
        models: models,
        mongoose: mongoose,
        db: db
    }
};
