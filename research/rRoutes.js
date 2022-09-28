const { Router } = require("express");
const router = Router();

//research controller
const researchController = require("./rController");

//API routes of events
router.get("/", researchController.getAllResearchs);
router.get("/:id", researchController.getResearchbyId);
router.post("/", researchController.postResearch);
router.put("/:id", researchController.updateResearchbyId);
router.delete("/:id", researchController.deleteResearchbyId);

module.exports = router;
