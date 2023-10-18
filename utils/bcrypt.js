const bcrypt = require("bcryptjs");
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};
module.exports = { hashPassword };
