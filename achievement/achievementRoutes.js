const { Router } = require("express");
const router = Router();
const achievementController = require("./achievementController");

//Routes
router.get("/", achievementController.getAllAchievements);
router.get("/:id", achievementController.getAchievementbyId);
router.post("/", achievementController.postAchievement);
router.put("/:id", achievementController.updateAchievementbyId);
router.delete("/:id", achievementController.deleteAchievementbyId);

module.exports = router;
