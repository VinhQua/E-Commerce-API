const { StatusCodes } = require("http-status-codes");
const createOrder = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "create order" });
};
const getAllOrders = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "get all orders" });
};

const getAllUserOrders = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "get all user orders" });
};
const getSingleOrder = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "get single order" });
};
const updateOrder = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "get single order" });
};
module.exports = {
  createOrder,
  getAllOrders,
  getAllUserOrders,
  getSingleOrder,
  updateOrder,
};
