const mongoose = require("mongoose");

const industryCollabSchema = new mongoose.Schema(
    {
        title : { required: true, type: String },
        image : []
    },
    { timestamps: true }
);

module.exports = mongoose.model("IndustryCollab", industryCollabSchema);