const { StatusCodes } = require("http-status-codes");
const getAllUsers = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "all users", user: req.user });
};
const getSingleUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "get single user" });
};
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "show current user" });
};
const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "update user" });
};

module.exports = { getAllUsers, getSingleUser, showCurrentUser, updateUser };
