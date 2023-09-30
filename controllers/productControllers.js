const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const getAllProducts = async (req, res) => {
  const products = await Product.findAll({});
  res.status(StatusCodes.OK).json({ products });
};
const createdProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

module.exports = { getAllProducts, createdProduct };
