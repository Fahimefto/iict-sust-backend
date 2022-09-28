const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    batchName: { required: true, type: String },
    session: { required: true, type: String },
    file: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Batches", batchSchema);
