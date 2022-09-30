const { Router } = require("express");
const router = Router();

//director controller
const directorController = require("./historyController");

//API routes of director
router.get("/", directorController.getAllDirectors);
router.get("/:id", directorController.getDirectorbyId);
router.post("/", directorController.postDirector);
router.put("/:id", directorController.updateDirectorbyId);
router.delete("/:id", directorController.deleteDirectorbyId);

module.exports = router;
