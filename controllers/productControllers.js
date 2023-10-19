const { StatusCodes } = require("http-status-codes");
const { Product } = require("../models/product");
const { Op } = require("sequelize");
const { uploadBasic } = require("../utils/googledrive");
const getAllProducts = async (req, res) => {
  const { featured, freeShipping, company, category, numericFilters, search } =
    req.body;
  let queryObject = {};
  if (featured) {
    queryObject.featured = featured;
  }
  if (freeShipping) {
    queryObject.freeShipping = freeShipping;
  }
  if (company) {
    queryObject.company = company;
  }
  if (category) {
    queryObject.category = category;
  }

  if (search) {
    queryObject.name = {
      [Op.iLike]: `%${search}%`,
    };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": Op.gt,
      ">=": Op.gte,
      "=": Op.eq,
      "<": Op.lt,
      "<=": Op.lte,
    };
    const regEx = /\b(<|<=|=|>=|>)\b/;
    const options = ["averageRating", "price"];
    const filters = numericFilters.split(",").map((filter) =>
      filter.replace(regEx, (match) => {
        const [field, value] = filter.split(match);
        if (options.includes(field)) {
          queryObject[field] = { [operatorMap[match]]: value };
        }
      })
    );
  }
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const products = await Product.findAll({
    offset: (page - 1) * limit,
    limit: limit,
    where: queryObject,
  });
  res.status(StatusCodes.OK).json({ products });
};
const createProduct = async (req, res) => {
  if (req.body.length > 1) {
    const products = await Product.bulkCreate(req.body);
    return res.status(StatusCodes.CREATED).json({ products });
  }
  const product = await Product.create(req.body);
  return res.status(StatusCodes.CREATED).json({ product });
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
  const image = req.files.image;

  await uploadBasic(image.tempFilePath);
  res.status(StatusCodes.OK).json({ image });
};

module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  uploadImage,
};
