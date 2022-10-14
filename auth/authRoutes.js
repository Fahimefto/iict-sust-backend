const { Router } = require("express");
const router = Router();

const authController = require("./authController");
const verifyToken = require("../middleware/verify_jwt");
const verify_Roles = require("../middleware/verifyRoles");

router.get("/", verifyToken,verify_Roles, authController.getAllUsers);
router.post("/login", authController.authLogin);
router.post("/register", authController.authRegister);
router.put("/update/:id", authController.updateUserByID);
router.delete("/:id", authController.deleteUserByID);

module.exports = router;
