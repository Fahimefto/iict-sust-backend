const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
  {
    name: { required: true, type: String },
    address: { required: true, type: String },
    phone: { required: true, type: String },
    email: { required: true, type: String },
    social_media: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);