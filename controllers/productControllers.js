const { StatusCodes } = require("http-status-codes");
const { Product } = require("../models/product");
const { Op } = require("sequelize");
const { BadRequest, NotFound } = require("../errors");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
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
  // if (req.body.length > 1) {
  //   const products = await Product.bulkCreate(req.body);
  //   return res.status(StatusCodes.CREATED).json({ products });
  // }
  req.body.UserId = req.user.userId;
  const product = await Product.create(req.body);
  return res.status(StatusCodes.CREATED).json({ product });
};
const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ where: { id } });
  if (!product) {
    throw new NotFound(`no product with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ product });
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.destroy({
    where: {
      id,
    },
  });
  if (!product) {
    throw new NotFound(`not product with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Success! product deleted" });
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.update(req.body, { where: { id } });
  if (!product) {
    throw new NotFound(`no product with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ product });
};
const uploadImage = async (req, res) => {
  // const product = await Product.create(req.body);

  if (!req.files) {
    throw new BadRequest("No file upload");
  }

  const image = req.files.image;
  console.log(image);
  const uploadedLink = await cloudinary.uploader.upload(image.tempFilePath, {
    folder: "kHai Tam Space",
    use_filename: true,
  });
  fs.unlinkSync(image.tempFilePath);
  res.status(StatusCodes.OK).json({ uploadedLink });
};

module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  uploadImage,
};
