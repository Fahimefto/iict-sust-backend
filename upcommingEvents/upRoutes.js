const { Router } = require("express");
const router = Router();
const upEventController = require("./upController");

//API routes of events
router.get("/", upEventController.getAllUpEvents);
router.get("/:id", upEventController.getUpEventbyId);
router.post("/", upEventController.postUpEvent);
router.put("/:id", upEventController.updateUpEventbyId);
router.delete("/:id", upEventController.deleteUpEventbyId);

module.exports = router;
