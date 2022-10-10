const {Router } = require("express");
const router = Router();

//industry controller 
const industrycontroller= require("./industryController");

//API routes for industry
router.get("/", industrycontroller.getAllIndustry);
router.get("/:id", industrycontroller.getIndustryById);
router.post("/", industrycontroller.postIndustry);
router.put("/:id", industrycontroller.updateIndustryById);
router.delete("/:id", industrycontroller.deleteIndustryById);



module.exports = router;