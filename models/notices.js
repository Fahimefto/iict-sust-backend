const mongoose = require("mongoose");
const noticeSchema = new mongoose.Schema(
  {
    type: {
      required: true,
      type: String,
      enum: ["urgent", "sports", "scholarship", "result", "others"],
    },
    title: { required: true, type: String },
    description: { required: true, type: String },
    image: [],
    file: { type: Buffer },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notices", noticeSchema);
