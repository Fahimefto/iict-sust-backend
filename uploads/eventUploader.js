const { Router } = require("express");
const router = Router();
const cloudinary = require("./cloudinary");
const fs = require("fs");

const getUploadUrl = async (req, res) => {
  try {
    const files = req.files;

    const imagebuffer = [];
    if (files.image.length > 1) {
      for (let i = 0; i < files.image.length; i++) {
        const { tempFilePath } = files.image[i];
        const data = await cloudinary.uploader.upload(tempFilePath, {
          folder: "multiple",
        });
        imagebuffer.push(data);
        tempDel(tempFilePath);
      }

      return imagebuffer;
    } else {
      const { tempFilePath } = files.image;
      const data = await cloudinary.uploader.upload(tempFilePath, {
        folder: "single",
      });
      imagebuffer.push(data);
      tempDel(tempFilePath);

      return imagebuffer;
    }
  } catch (error) {
    console.log(error.message);
  }
};
const tempDel = async (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
};

module.exports = { getUploadUrl };
