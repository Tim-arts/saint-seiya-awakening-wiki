const cloudinary = require("cloudinary").v2;
const app = require("./server/config");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (global.utils.getLocales && process.env.NODE_ENV === "development") {
    require("./server/getLocales")(cloudinary);
}

if (process.env.NODE_ENV === "development") {
    require("./fixtures/fixtures")(global.utils.fixtures);
}

app.set("port", (process.env.PORT || 5000));
app.listen(app.get("port"));
