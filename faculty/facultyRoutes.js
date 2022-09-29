//router import

const { Router } = require("express");
const router = Router();

//Faculty controller
const facultyController = require("./facultyController.js");

//API routes for faculty
router.get("/", facultyController.getAllFaculty);
router.get("/:id", facultyController.getFacultyById);
router.post("/", facultyController.postFaculty);
router.put("/:id" ,facultyController.updateFacultyById);
router.delete("/:id" ,facultyController.deleteFacultyById);

module.exports = router;
