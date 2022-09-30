const { Router } = require("express");
const router = Router();
const cloudinary = require("./cloudinary");
const upload = require("./multer");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
