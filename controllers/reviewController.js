const { StatusCodes } = require("http-status-codes");
const { Review } = require("../models/review");
const { NotFound } = require("../errors");
const getAllReviews = async (req, res) => {
  const reviews = await Review.findAll({ include: ["Product"] });
  res.status(StatusCodes.OK).json({ reviews });
};
const createReview = async (req, res) => {
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};
const getSingleReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findOne({ where: { id } });
  if (!review) {
    throw new NotFound(`no review with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ review });
};
const updateReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findOne(req.bdy, { where: { id } });
  if (!review) {
    throw new NotFound(`no review with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ review });
};
const deleteReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.destroy({ where: { id } });
  if (!review) {
    throw new NotFound(`no review with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Success! Review Deleted" });
};
const getSingleProductReviews = async (req, res) => {};

module.exports = {
  getSingleProductReviews,
  getAllReviews,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
};
