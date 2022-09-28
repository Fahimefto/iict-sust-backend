const Researchs = require("../models/research");
const mongoose = require("mongoose");

//get all researchs
const getAllResearchs = async (req, res) => {
  try {
    const research = await Researchs.find({});
    res.json(research);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get Research by id
const getResearchbyId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No event with that id" });
  try {
    const research = await Researchs.findById({ _id: id });
    if (!research)
      return res.status(404).json({ message: "No event with that id" });
    res.json(research);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//post Research
const postResearch = async (req, res) => {
  const { area, title, description } = req.body;
  try {
    const research = await Researchs.create({
      area,
      title,
      description,
    });
    res.status(200).json({ message: "event created successfully", research });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update Research by id
const updateResearchbyId = async (req, res) => {
  const { id } = req.params;
  const { area, title, description } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No event with that id" });
  try {
    const research = await Researchs.findByIdAndUpdate(
      { _id: id },
      {
        area,
        title,
        description,
      }
    );
    if (!research)
      return res.status(404).json({ message: "No event with that id" });
    res.json({ message: "event updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete Research by id
const deleteResearchbyId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No event with that id" });
  try {
    const research = await Researchs.findByIdAndDelete({ _id: id });
    if (!research)
      return res.status(404).json({ message: "No event with that id" });
    res.json({ message: "event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllResearchs,
  postResearch,
  updateResearchbyId,
  deleteResearchbyId,
  getResearchbyId,
};
