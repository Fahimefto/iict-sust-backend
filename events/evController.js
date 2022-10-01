const mongoose = require("mongoose");
const Events = require("../models/events");
const cloudinary = require("../uploads/cloudinary");
const uploader = require("../uploads/eventUploader");

//get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Events.find({});
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get event by id
const getEventbyId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No event with that id" });
  try {
    const event = await Events.findById({ _id: id });
    if (!event)
      return res.status(404).json({ message: "No event with that id" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//post event
const postEvent = async (req, res) => {
  try {
    const answer = await uploader.getUploadUrl(req, res);
    console.log(answer);

    const { title, description, date, location } = req.body;
    const event = await Events.create({
      title,
      description,
      date,
      location,
      image: answer,
    });

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

//update event by id
const updateEventbyId = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location, image } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No event with that id" });
  try {
    const event = await Events.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        date,
        location,
        image,
      }
    );
    if (!event)
      return res.status(404).json({ message: "No event with that id" });
    res.json({ message: "event updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete event by id
const deleteEventbyId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No event with that id" });
  try {
    const event = await Events.findByIdAndDelete({ _id: id });
    if (!event)
      return res.status(404).json({ message: "No event with that id" });
    res.json({ message: "event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllEvents,
  postEvent,
  updateEventbyId,
  deleteEventbyId,
  getEventbyId,
};
