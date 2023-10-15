const { StatusCodes } = require("http-status-codes");
const getAllUsers = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "all users" });
};
const getSingleUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "get single user" });
};
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "show current user" });
};
module.exports = { getAllUsers, getSingleUser, showCurrentUser };
