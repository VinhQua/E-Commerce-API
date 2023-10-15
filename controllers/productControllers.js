const { StatusCodes } = require("http-status-codes");
const getAllProducts = async (req, res) => {
  // const products = await Product.findAll({});
  res.status(StatusCodes.OK).json({ msg: "all products" });
};
const createProduct = async (req, res) => {
  // const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "create product" });
};
const getSingleProduct = async (req, res) => {
  // const product = await Product.create(req.body);
  res.status(StatusCodes.OK).json({ msg: "get single product" });
};
const deleteProduct = async (req, res) => {
  // const product = await Product.create(req.body);
  res.status(StatusCodes.OK).json({ msg: "delete product" });
};
const updateProduct = async (req, res) => {
  // const product = await Product.create(req.body);
  res.status(StatusCodes.OK).json({ msg: "update product" });
};
const uploadImage = async (req, res) => {
  // const product = await Product.create(req.body);
  res.status(StatusCodes.OK).json({ msg: "upload image" });
};

module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  uploadImage,
};
