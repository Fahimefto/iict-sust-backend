const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    title: { required: true, type: String },
    date: { required: true, type: Date },
    location: { required: true, type: String },
    description: { required: true, type: String },
    image: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Events", eventSchema);
