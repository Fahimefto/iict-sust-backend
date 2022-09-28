const { Router } = require("express");
const router = Router();

//Stuff Controller
const contactController = require("./conController");

//API routes of contact
router.get("/" ,contactController.getAllContact);
router.get("/:id" , contactController.getContactbyId);
router.post("/" , contactController.addContact);
router.put ("/:id" , contactController.updateContactbyId);
router.delete("/:id" , contactController.deleteContactbyId);

module.exports = router ;