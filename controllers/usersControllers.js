const prisma = require("../prisma");
const getAllUser = async (req, res) => {
  const users = await prisma.user.findMany({});
  res.status(200).json({ users });
};
const createUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      ...req.body,
    },
  });
  res.status(200).json({ user });
};
module.exports = { getAllUser, createUser };
