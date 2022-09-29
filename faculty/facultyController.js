const mongoose = require("mongoose");
const Faculty = require("../models/faculty.js");

//post a faculty
const postFaculty = async (req, res) => {
  const {
    name,
    designation,
    status,
    phone,
    email,
    biography,
    education,
    projects,
    scholarship,
    research,
    publications,
    teachings,
    images,
    links,
  } = req.body;

  try {
    const faculty = await Faculty.create({
      name,
      designation,
      status,
      phone,
      email,
      biography,
      education,
      projects,
      scholarship,
      research,
      publications,
      teachings,
      images,
      links,
    });
    res.status(200).json({
      status: "OK",
      message: "A faculty member created successfully",
      data: faculty,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
//update a faculty by ID

const updateFacultyById = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    designation,
    status,
    phone,
    email,
    biography,
    education,
    projects,
    scholarship,
    research,
    publications,
    teachings,
    images,
    links,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ status: "error", message: "Invalid id" });

  try {
    const faculty = await Faculty.findByIdAndUpdate(
      { _id: id },
      {
        name,
        designation,
        status,
        phone,
        email,
        biography,
        education,
        projects,
        scholarship,
        research,
        publications,
        teachings,
        images,
        links,
      }
    );
    if (!faculty)
      return res.status(404).json({
        status: "404 Not Found",
        message: "No faculty Found by such ID",
      });

    res.json({ status: "OK", message: "Updated successfully", data: faculty });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Internal Server Error", message: error.message });
  }
};
//get all faculty members
const getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find({});
    res.status(200).json({
      status: "success",
      message: "Faculty member list found successfully",
      data: faculty,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

//get faculty member by id
const getFacultyById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "Invalid id" });

  try {
    const faculty = await Faculty.findById(id);

    if (!faculty)
      return res.status(404).json({ message: "Failed to find Faculty" });

    res.status(200).json({
      status: "success",
      message: "Faculty member found successfully",
      data: faculty,
    });
  } catch (error) {
    res.status(404).json({ status: "Not found", message: error.message });
  }
};
//delete faulty by id
const deleteFacultyById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ status: "Not found", message: "Invalid id" });
  try {
    const faculty = await Faculty.findByIdAndDelete({ _id: id });
    if (!faculty)
      return res
        .status(404)
        .json({ status: "Not found", message: "Invalid id" });
    res.status(200).json({
      status: "OK",
      message: "faculty deleted successfully",
      data: faculty,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  postFaculty,
  getAllFaculty,
  getFacultyById,
  updateFacultyById,
  deleteFacultyById,
};
