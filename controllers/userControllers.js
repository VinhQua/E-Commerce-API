const { StatusCodes } = require("http-status-codes");
const { User } = require("../models/user");
const { NotFound } = require("../errors");
const { hashPassword } = require("../utils");
const getAllUsers = async (req, res) => {
  // const queryObject = {}
  const users = await User.findAll({});

  res.status(StatusCodes.OK).json({ users });
};
const getSingleUser = async (req, res) => {
  const { id } = req.body;
  const user = await User.findOne({ where: { id } });
  if (!user) {
    throw new NotFound(`no user with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};
const showCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(StatusCodes.OK).json({ user });
};
const updateUser = async (req, res) => {
  let { password, name, email, id } = req.body;

  if (password) {
    password = await hashPassword(password);
  }
  const user = await User.update({ name, email, password }, { where: { id } });
  if (!user) {
    throw new NotFound(`no user with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Success! User updated" });
};

module.exports = { getAllUsers, getSingleUser, showCurrentUser, updateUser };
