const mongoose = require("mongoose");
const UpEvents = require("../models/upEvents");

//get all events
const getAllUpEvents = async (req, res) => {
  try {
    const upevents = await UpEvents.find({});
    res.json(upevents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get event by id
const getUpEventbyId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No event with that id" });
  try {
    const event = await UpEvents.findById({ _id: id });
    if (!event)
      return res.status(404).json({ message: "No event with that id" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//post event
const postUpEvent = async (req, res) => {
  const { title, description, date, location, image } = req.body;
  try {
    const upevent = await UpEvents.create({
      title,
      description,
      date,
      location,
      image,
    });
    res.json(upevent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update event by id
const updateUpEventbyId = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location, image } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No event with that id" });
  try {
    const upevent = await UpEvents.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        date,
        location,
        image,
      }
    );
    if (!upevent)
      return res.status(404).json({ message: "No event with that id" });
    res.json({ message: "event updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete event by id
const deleteUpEventbyId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No event with that id" });
  try {
    const upevent = await UpEvents.findByIdAndDelete({ _id: id });
    if (!upevent)
      return res.status(404).json({ message: "No event with that id" });
    res.json({ message: "event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUpEvents,
  postUpEvent,
  updateUpEventbyId,
  deleteUpEventbyId,
  getUpEventbyId,
};
