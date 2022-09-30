const mongoose = require("mongoose");
const Achievement = require("../models/achievement");

//get all Achievement
const getAllAchievements = async (req, res) => {
  try {
    const data = await Achievement.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get Achievement by id
const getAchievementbyId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No Achievement with that id" });
  try {
    const data = await Achievement.findById({ _id: id });
    if (!data)
      return res.status(404).json({ message: "No Achievement with that id" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//post Achievement
const postAchievement = async (req, res) => {
  const { title, description, date, location, image } = req.body;
  try {
    const data = await Achievement.create({
      title,
      description,
      date,
      location,
      image,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update Achievement by id
const updateAchievementbyId = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location, image } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No Achievement with that id" });
  try {
    const data = await Achievement.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        date,
        location,
        image,
      }
    );
    if (!data)
      return res.status(404).json({ message: "No Achievement with that id" });
    res.json({ message: "Achievement updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete Achievement by id
const deleteAchievementbyId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No Achievement with that id" });
  try {
    const data = await Achievement.findByIdAndDelete({ _id: id });
    if (!data)
      return res.status(404).json({ message: "No Achievement with that id" });
    res.json({ message: "Achievement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAchievements,
  postAchievement,
  updateAchievementbyId,
  deleteAchievementbyId,
  getAchievementbyId,
};
