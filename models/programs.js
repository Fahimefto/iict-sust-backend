const mongoose = require("mongoose");
const progSchema = new mongoose.Schema(
  {
    type: {
      required: true,
      type: String,
      enum: ["undergrad", "postgrad", "diploma", "certificate-course"],
    },
    title: { required: true, type: String },
    description: { required: true, type: String },
    session: { required: true, type: String },
    image: [],
    file: { type: Buffer },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Programs", progSchema);
