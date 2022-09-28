//router import
const { Router } = require("express");
const router = Router();

//notice controller
const programsController = require("./progController");

//API routes of notices
router.get("/", programsController.getAllPrograms);
router.get("/:type", programsController.getProgramsbyType);
router.post("/", programsController.addProgram);
router.put("/:id", programsController.updateProgrambyId);
router.delete("/:id",programsController.deleteProgrambyId);
router.get("/id/:id", programsController.getProgrambyId);

module.exports = router;
