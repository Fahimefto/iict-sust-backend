const { Router } = require("express");
const router = Router();

const authController = require("./authController");

router.get("/", authController.getAllUsers);
router.post("/login", authController.authLogin);
router.post("/register", authController.authRegister);
router.put("/update/:id", authController.updateUserByID);
router.delete("/:id", authController.deleteUserByID);

module.exports = router;
