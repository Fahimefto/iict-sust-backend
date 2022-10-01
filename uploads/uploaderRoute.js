const { Router } = require("express");
const router = Router();
const cloudinary = require("./cloudinary");

router.post("/", async (req, res, next) => {
  const files = req.files.image;

  const imagebuffer = [];

  for (let i = 0; i < files.length; i++) {
    const { tempFilePath } = files[i];
    const data = await cloudinary.uploader.upload(tempFilePath, {
      folder: "multiple",
    });
    imagebuffer.push(data);
  }
  res.json(imagebuffer);
});

module.exports = router;
