const mongoose = require("mongoose");
const batch = require("../models/batch");
const Batchs = require("../models/batch");

//Get all batches
const getAllBatches = async (req, res) => {
  try {
    const batches = await Batchs.find({});
    res.json(batches);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

//Get Batch By Id

const getBatchById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(500).json({ message: "No batch found by id" });
  }
  try {
    const batch = await Batchs.findById({ _id: id });
    if (!batch) {
      return res.status(404).json({ message: "No batch found by id" });
    }
    res.json(batch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//post Batch
const postBatch = async (req, res) => {
  const { batchName, session, file } = req.body;
  try {
    const batch = await Batchs.create({
      batchName,
      session,
      file,
    });
    res.json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update Batch by id

const updateBatchById = async (req, res) => {
  const { id } = req.params;
  const { batchName, session, file } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No batch found by id" });
  }
  try {
    const batch = await Batchs.findOneAndUpdate(
      { _id: id },
      {
        batchName,
        session,
        file,
      }
    );
    if (!batch)
      return res.status(404).json({ message: "No batch found by name" });
    res.status(200).json({ message: "Batch updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete Batch by id
const deleteBatchById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No batch found by id" });
  }
  try {
    const event = await Batchs.findByIdAndDelete({ _id: id });
    if (!batch) {
      return res.status(404).json({ message: "No batch found by ID" });
    }
    res.json({ message: "Batch deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllBatches,
  getBatchById,
  postBatch,
  updateBatchById,
  deleteBatchById,
};
