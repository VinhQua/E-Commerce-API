const { StatusCodes } = require("http-status-codes");
const { User } = require("../models/user");
const { attachCookiesToResponse } = require("../utils");
const { NotFound, BadRequest } = require("../errors");
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  attachCookiesToResponse({ res, token: user.token });
  return res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, email: user.email, role: user.role } });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please enter email and password");
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotFound("Wrong Email");
  }
  if (!user.authenticate(password)) {
    throw new BadRequest("Wrong Password");
  }
  attachCookiesToResponse({ res, token: user.token });
  return res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, email: user.email, role: user.role } });
};

const logout = async (req, res) => {
  // clear cookie
  attachCookiesToResponse({ res, token: "" });
  return res.status(StatusCodes.OK).json({ msg: "logout" });
};
module.exports = { register, login, logout };
