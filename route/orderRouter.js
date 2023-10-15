const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  createOrder,
  getSingleOrder,
  updateOrder,
  getAllUserOrders,
} = require("../controllers/orderController");
router.route("/").get(getAllOrders).post(createOrder);
router.route("/showAllMyOrders").get(getAllUserOrders);
router.route("/:id").get(getSingleOrder).patch(updateOrder);
module.exports = router;
