//router import
const { Router } = require("express");
const router = Router();
const cloudinary = require("../uploads/cloudinary");
const uploader = require("../uploads/eventUploader");

const path = require("path");
const Events = require("../models/events");

//event controller
const eventController = require("./evController");

//API routes of events
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventbyId);
router.post("/", eventController.postEvent);
router.put("/:id", eventController.updateEventbyId);
router.delete("/:id", eventController.deleteEventbyId);

module.exports = router;
