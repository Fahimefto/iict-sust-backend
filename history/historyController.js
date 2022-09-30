const mongoose = require("mongoose");
const Director = require("../models/director");

//get all Directors
const getAllDirectors = async (req, res) => {
  try {
    const data = await Director.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get Director by id
const getDirectorbyId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No director with that id" });
  try {
    const data = await Director.findById({ _id: id });
    if (!data)
      return res.status(404).json({ message: "No director with that id" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//post Director
const postDirector = async (req, res) => {
  const { name, designation, from, to, image } = req.body;
  try {
    const data = await Director.create({
      name,
      designation,
      from,
      to,
      image,
    });
    res.json({ message: "Director added successfully", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update Director by id
const updateDirectorbyId = async (req, res) => {
  const { id } = req.params;
  const { name, designation, from, to, image } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No Director with that id" });
  try {
    const data = await Director.findByIdAndUpdate(
      { _id: id },
      {
        name,
        designation,
        from,
        to,
        image,
      }
    );
    if (!data)
      return res.status(404).json({ message: "No Director with that id" });
    res.json({ message: "Director updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete Director by id
const deleteDirectorbyId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No director with that id" });
  try {
    const data = await Director.findByIdAndDelete({ _id: id });
    if (!data)
      return res.status(404).json({ message: "No Director with that id" });
    res.json({ message: "Director deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDirectors,
  postDirector,
  updateDirectorbyId,
  deleteDirectorbyId,
  getDirectorbyId,
};
