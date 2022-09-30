const mongoose = require("mongoose");
const Contact = require("../models/contact");

//get all contacts
const getAllContact = async (req, res) => {
  try {
    const contact = await Contact.find({});
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get contact by id
const getContactbyId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No contact with that id" });
  try {
    const contact = await Contact.findById({ _id: id });
    if (!contact)
      return res.status(404).json({ message: "No contact with that id" });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add contact
const addContact = async (req, res) => {
  const { name, address, phone, email, social_media } = req.body;
  try {
    const contact = await Contact.create({
      name,
      address,
      phone,
      email,
      social_media,
    });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update contact by id
const updateContactbyId = async (req, res) => {
  const { id } = req.params;
  const { name, address, phone, email, social_media } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No contact with that id" });
  try {
    const contact = await Contact.findByIdAndUpdate(
      { _id: id },
      {
        name,
        address,
        phone,
        email,
        social_media,
      }
    );
    if (!contact)
      return res.status(404).json({ message: "No contact with that id" });
    res.json({ message: "contact updated successfully", contact: contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete contact by id
const deleteContactbyId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No contact with that id" });
  try {
    const contact = await Contact.findByIdAndDelete({ _id: id });
    if (!contact)
      return res.status(404).json({ message: "No contact with that id" });
    res.json({ message: "contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllContact,
  addContact,
  getContactbyId,
  updateContactbyId,
  deleteContactbyId,
};
