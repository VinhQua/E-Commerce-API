require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
// Routes
const product = require("./route/productRouter");
const auth = require("./route/authRouter");
const user = require("./route/userRoute");
const order = require("./route/orderRouter");
const review = require("./route/reviewRouter");
const app = express();

//Swagger UI

//extra security packages
const cors = require("cors");
const { connect } = require("./db/connect");
app.use(cors());
const port = process.env.PORT || 3000;
app.set("trust proxy", true);
//middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload({ useTempFiles: true }));
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});
//routes
app.get("/", (req, res) => res.send(`File Upload`));
// auth
app.use("/api/v1/auth", auth);
// orders
app.use("/api/v1/orders", order);
// products
app.use("/api/v1/products", product);
// reviews
app.use("/api/v1/reviews", review);
// users
app.use("/api/v1/users", user);

//not found
app.use(notFound);
//error handler
app.use(errorHandler);
const start = async () => {
  try {
    await connect();
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
