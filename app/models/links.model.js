const mongoose = require("mongoose");

const Links = mongoose.model(
    "links",
    new mongoose.Schema({
        links: [String],
        fetched: Boolean
    })
);

module.exports = Links
