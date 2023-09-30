const cloudinary = require("cloudinary").v2;
const { StatusCodes } = require("http-status-codes");
const fs = require("fs");
const uploadImage = async (req, res) => {
  const image = req.files.image;
  const uploadedFile = await cloudinary.uploader.upload(image.tempFilePath, {
    folder: "file uploader",
  });
  fs.unlinkSync(image.tempFilePath);
  res.status(StatusCodes.OK).json({ image: { src: uploadedFile.secure_url } });
};

module.exports = { uploadImage };
