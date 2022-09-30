const { Router } = require("express");
const router = Router();

//Stuff Controller
const staffController = require("./sConttroller");

//API routes of Stuff
router.get("/", staffController.getAllStaffs);
router.get("/:id", staffController.getStaffByID);
router.post("/", staffController.postStaff);
router.put("/:id", staffController.updateStaffbyID);
router.delete("/:id", staffController.deleteStaff);

module.exports = router;
