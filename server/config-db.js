const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;

// On error
db.on("error", console.error.bind(console, "connection error:"));

// On success
// db.once("open", () => {
//     console.log("Connected to MongoDB");
// });

// On close
// db.once("close", () => {
//     console.log("Close connection");
// });

module.exports = (models) => {
    return {
        models: models,
        mongoose: mongoose,
        db: db
    }
};
