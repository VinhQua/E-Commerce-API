const path = require("path");
const keyFilePath = path.resolve("./credentials.json");
const fs = require("fs");
const { GoogleAuth } = require("google-auth-library/build/src");
const { google } = require("googleapis");
const auth = new GoogleAuth({
  scopes: "https://www.googleapis.com/auth/drive",
  keyFile: keyFilePath,
});
const uploadFileToGoogleDrive = async (image) => {
  const drive = await google.drive({ version: "v3", auth });
  const { data } = await drive.files.create({
    requestBody: {
      name: image.name,

      parents: ["1KLtyRnvZojsMqATAJTu3ml8JvJ67UMnT"],
    },
    media: {
      mimeType: image.mimetype,
      body: fs.createReadStream(image.tempFilePath),
    },
    fields: "id,name",
  });
  fs.unlinkSync(image.tempFilePath);
  return `https://drive.google.com/open?id=${data.id}`;
};
module.exports = { uploadFileToGoogleDrive };
