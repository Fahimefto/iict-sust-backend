const mongoose = require("mongoose");
const Programs = require("../models/programs");

//get all programs
const getAllPrograms = async (req, res) => {
  try {
    const programs = await Programs.find({});
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get programs by type
const getProgramsbyType = async (req, res) => {
  const { type } = req.params;
  try {
    const programs = await Programs.find({ type: type });
    if (!programs)
      return res.status(404).json({ message: "No programs with that type" });
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get program by id
const getProgrambyId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No program with that id" });
  try {
    const program = await Programs.findById({ _id: id });
    if (!program)
      return res.status(404).json({ message: "No program with that id"});
    res.json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add program
const addProgram = async (req, res) => {
  const { type, title, description, session,image, file } = req.body;
  try {
    const program = await Programs.create({
      type,
      title,
      description,
      session,
      image,
      file,
    });
    res.json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update program by id
const updateProgrambyId = async (req, res) => {
  const { id } = req.params;
  const { type, title, description,session, image, file } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No program with that id" });
  try {
    const program = await Programs.findByIdAndUpdate(
      { _id: id },
      {
        type,
        title,
        description,
        session,
        image,
        file,
      }
    );
    if (!program)
      return res.status(404).json({ message: "No program with that id" });
    res.json({ message: "program updated successfully" , program : program});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete program by id
const deleteProgrambyId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No program with that id" });
  try {
    const program = await Programs.findByIdAndDelete({ _id: id });
    if (!program)
      return res.status(404).json({ message: "No program with that id" });
    res.json({ message: "program deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPrograms,
  addProgram,
  getProgramsbyType,
  getProgrambyId,
  updateProgrambyId ,
  deleteProgrambyId,
};
