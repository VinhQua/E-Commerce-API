require("dotenv").config();
require("express-async-errors");
const express = require("express");

const errorHandler = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");
const authMiddleware = require("./middlewares/auth");
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
