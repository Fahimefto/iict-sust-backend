const mongoose = require("mongoose");
const testSchema = new mongoose.Schema({
  name: { required: true, type: String },
  avatar: { type: String },
  clouninary_id: { type: String },
});

module.exports = mongoose.model("Image", testSchema);
