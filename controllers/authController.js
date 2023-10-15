const { StatusCodes } = require("http-status-codes");
const register = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "register" });
};
const login = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "login" });
};

const logout = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "logout" });
};
module.exports = { register, login, logout };
