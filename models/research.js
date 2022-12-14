const mongoose = require("mongoose");
const researchSchema = new mongoose.Schema(
  {
    area: { required: true, type: String },
    title: { required: true, type: String },
    description: { required: true, type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Researchs", researchSchema);
