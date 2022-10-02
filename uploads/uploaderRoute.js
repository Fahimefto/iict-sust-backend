const { Router } = require("express");
const fs = require("fs");
const router = Router();
const cloudinary = require("./cloudinary");
const controller = require("./eventUploader");

router.post("/", controller.getUploadUrl);

module.exports = router;
