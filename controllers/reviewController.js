const { StatusCodes } = require("http-status-codes");
const { Review } = require("../models/review");
const getAllReviews = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "get all reviews" });
};
const createReview = async (req, res) => {
  res.status(StatusCodes.CREATED).json({ msg: "create review" });
};
const getSingleReview = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "get single review" });
};
const updateReview = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "update review" });
};
const deleteReview = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "delete review" });
};
module.exports = {
  getAllReviews,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
};
