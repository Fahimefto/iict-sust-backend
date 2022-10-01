const { Router } = require("express");
const router = Router();
const cloudinary = require("./cloudinary");
const fs = require("fs");
const controller = require("./eventUploader");

router.post("/", controller.getUploadUrl);

module.exports = router;
