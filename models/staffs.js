const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  staffName: { required: true, type: String },
  staffDesignation: { required: true, type: String },
  staffContact: { equired: true, type: String },
  staffEmail: { equired: true, type: String },
  staffImage: [],
});



module.exports = mongoose.model("Staffs", staffSchema);
