const mongoose = require("mongoose");
const authUserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNum: { type: Number, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuthUser", authUserSchema);
