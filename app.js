require("dotenv").config();
require("express-async-errors");
const express = require("express");
const { connectDB } = require("./db/connectDB");
const errorHandler = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");
const authMiddleware = require("./middlewares/auth");
const product = require("./route/productRouter");
const app = express();
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
//Swagger UI

//extra security packages

const port = process.env.PORT || 3000;
app.set("trust proxy", true);
//middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
//routes
app.get("/", (req, res) => res.send(`File Upload`));

// products
app.use("/api/v1/products", product);
//not found
app.use(notFound);
//error handler
app.use(errorHandler);
const start = async () => {
  try {
    await connectDB();
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
