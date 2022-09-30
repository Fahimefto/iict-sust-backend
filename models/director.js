const mongoose = require("mongoose");
const directorSchema = new mongoose.Schema(
  {
    name: { required: true, type: String },
    designation: { type: String, default: "Director" },
    from: { required: true, type: Date },
    to: { required: true, type: Date },
    image: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Directors", directorSchema);
