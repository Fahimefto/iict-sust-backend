const { Router } = require("express");
const router = Router() ;

const alumniController = require("./alumniController");

//API routes for Alumni
router.get("/", alumniController.getAllAlumni);
router.get("/:id" , alumniController.getAlumniById);
router.post("/" , alumniController.postAlumni);
router.put("/:id" ,alumniController.updateAlumniById);
router.delete("/:id" ,alumniController.deleteAlumniById);


module.exports = router;