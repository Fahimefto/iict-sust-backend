const mongoose = require("mongoose");
const Notices = require("../models/notices");

//get all notices
const getAllNotices = async (req, res) => {
  try {
    const notices = await Notices.find({});
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get notices by type
const getNoticesbyType = async (req, res) => {
  const { type } = req.params;
  try {
    const notices = await Notices.find({ type: type });
    if (!notices)
      return res.status(404).json({ message: "No notices with that type" });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get notice by id
const getNoticesbyId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No notice with that id" });
  try {
    const notice = await Notices.findById({ _id: id });
    if (!notice)
      return res.status(404).json({ message: "No notice with that id"});
    res.json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//post notice
const postNotice = async (req, res) => {
  const { type, title, description, image, file } = req.body;
  try {
    const notice = await Notices.create({
      type,
      title,
      description,
      image,
      file,
    });
    res.json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update notice by id
const updateNoticebyId = async (req, res) => {
  const { id } = req.params;
  const { type, title, description, image, file } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No notice with that id" });
  try {
    const notice = await Notices.findByIdAndUpdate(
      { _id: id },
      {
        type,
        title,
        description,
        image,
        file,
      }
    );
    if (!notice)
      return res.status(404).json({ message: "No notice with that id" });
    res.json({ message: "notice updated successfully" , notice : notice});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete notice by id
const deleteNoticebyId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No notice with that id" });
  try {
    const notice = await Notices.findByIdAndDelete({ _id: id });
    if (!notice)
      return res.status(404).json({ message: "No notice with that id" });
    res.json({ message: "notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllNotices,
  postNotice,
  getNoticesbyType,
  getNoticesbyId,
  updateNoticebyId,
  deleteNoticebyId,
};
