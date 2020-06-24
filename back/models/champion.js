const mongoose = require("mongoose");
const Champion = new mongoose.Schema(
    {
        name: String,
        image: String, 
        tags: Array,
        description: String,
        stats: Object,
        title:String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("champion", Champion);