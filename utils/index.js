const { hashPassword } = require("./bcrypt");
const { attachCookiesToResponse } = require("./cookie");
const { decodeToken } = require("./jwt");

module.exports = { hashPassword, decodeToken, attachCookiesToResponse };
