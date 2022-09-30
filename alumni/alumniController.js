const mongoose = require("mongoose");
const Alumni = require("../models/alumni");

//Get all alumni

const getAllAlumni = async (req, res) => {
  try {
    //const alumni = await Alumni.find({});
    const alumni = await Alumni.find({});
    res.status(200).json(alumni);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Internal Error", message: error.message });
  }
};

//get alumni by id

const getAlumniById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(500)
      .json({ status: "internal server error", message: "Invalid Alumni id." });
  try {
    const alumni = await Alumni.findById({ _id: id });
    if (!alumni)
      return res
        .status(404)
        .json({ status: "Not Found", message: "Alumni not found." });

    res.status(200).json({
      status: "OK",
      message: "Alumni successfully found By id",
      data: alumni,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//post alumni
const postAlumni = async (req, res) => {
  const { batchName, session, file } = req.body;

  try {
    const alumni = await Alumni.create({ batchName, session, file });
    res.status(200).json({
      status: "ok",
      message: "Alumni created successfully",
      data: alumni,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Internal Server Error", message: error.message });
  }
};

//Update Alumni by id
const updateAlumniById = async (req, res) => {
  const { id } = req.params;
  const { batchName, session, file } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ status: "Not Found", message: "Invalid Alumni Id" });

  try {
    const alumni = await Alumni.findOneAndUpdate(
      { _id: id },
      {
        batchName,
        session,
        file,
      }
    );

    if (!alumni)
      return res
        .status(404)
        .json({ status: "Not Found", message: "Invalid Alumni Id" });
    res.status(200).json({
      status: "OK",
      message: "Successsfully updated A alumni",
      data: alumni,
    });
  } catch (error) {}
  res
    .status(500)
    .json({ status: "Internal Server Error",
     message:error.message });
};

//delete Alumni by id

const deleteAlumniById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ status: "Not Found", message: "Invalid Alumni Id" });
  try {
    const alumni = await Alumni.findByIdAndDelete({ _id: id });
    if (!alumni) {
      return res
        .status(404)
        .json({ status: "Not Found", message: "Invalid Alumni Id" });
    }
    res.status(200).json({
      status: "OK",
      message: "Alumni Id Successfully deleted successfully",
      data: alumni,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Internal Server Error", message: error.message });
  }
};

module.exports = {
  getAllAlumni,
  getAlumniById,
  postAlumni,
  updateAlumniById,
  deleteAlumniById,
};
