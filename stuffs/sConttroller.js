const mongoose = require("mongoose");
const events = require("../models/events");
const Staffs = require("../models/staffs");

//get all staffs
const getAllStaffs = async (req, res) => {
  try {
    const staffs = await Staffs.find({});
    res.json(staffs);
  } catch (error) {
    res.status(500).josn({
      message: error.message,
    });
  }
};

//Get Staff By id
const getStaffByID = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({
      message: "No Officers/Staffs found by this ID",
    });
  try {
    const staff = await Staffs.findById({ _id: id });
    if (!staff) {
      return res.status(404).json({
        message: "No Officers/Staffs found by this ID",
      });
    }
    res.json(staff);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//Add a staff
const postStaff = async (req, res) => {
  const { staffName, staffDesignation, staffContact, staffEmail, staffImage } =
    req.body;
  try {
    const staff = await Staffs.create({
      staffName,
      staffDesignation,
      staffContact,
      staffEmail,
      staffImage,
    });
    res.json({ message: "succesfully created staff" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//Update a Staff By id
const updateStaffbyID = async (req, res) => {
  const { id } = req.params;
  const { staffName, staffDesignation, staffContact, staffEmail, staffImage } =
    req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({
      message: "No Officers/Staffs found by this ID",
    });
  try {
    const staff = await Staffs.findByIdAndUpdate(
      { _id: id },
      {
        staffName,
        staffDesignation,
        staffContact,
        staffEmail,
        staffImage,
      }
    );
    if (!staff) {
      return res.status(404).json({
        message: "No Officers/Staffs found by this ID",
      });
    }
    res.status(200).json({
      message: "Staff updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//Delete Staff By ID
const deleteStaff = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "No Officers/Staffs found by this ID",
    });
  }
  try {
    const staff = await Staffs.findByIdAndDelete({ _id: id });
    if (!staff) {
      return res.status(404).json({
        message: "No Officers/Staffs found by this ID",
      });
    }
    res.status(200).json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllStaffs,
  getStaffByID,
  postStaff,
  updateStaffbyID,
  deleteStaff,
};
