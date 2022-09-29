const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    name: { required: true, type: String },
    designation: { required: true, type: String },
    status: { required: true, type: String },
    phone: { required: true, type: String },
    email: { required: true, type: String },
    biography: { required: true, type: String },
    education: { required: true, type: String },
    projects: { type: String },
    scholarship: { type: String },
    research: { type: String },
    publications: { type: String },
    teachings: { type: String },
    images: [],
    links: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faculty", facultySchema);
