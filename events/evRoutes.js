//router import
const { Router } = require("express");
const router = Router();
const cloudinary = require("../uploads/cloudinary");
const upload = require("../uploads/multer");
const path = require("path");
const Events = require("../models/events");

//event controller
const eventController = require("./evController");

//API routes of events
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventbyId);
router.post("/", upload.array("image", 10), async (req, res) => {
  try {
    console.log(req.files);
    if (!req.body) return res.status(400).json({ message: "No data sent" });
    else {
      const result = await cloudinary.uploader.upload(...req.files.path, {
        folder: "events",
      });
      console.log(result);
      const { title, description, date, location } = req.body;
      const event = await Events.create({
        title,
        description,
        date,
        location,
        imgUrl: result.secure_url,
        cloudinary_id: result.public_id,
      });

      res.json(event);
      console.log(event);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});
router.put("/:id", eventController.updateEventbyId);
router.delete("/:id", eventController.deleteEventbyId);

module.exports = router;
