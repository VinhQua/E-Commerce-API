const { attachCookiesToResponse } = require("./cookie");
const { decodeToken } = require("./jwt");

module.exports = { decodeToken, attachCookiesToResponse };
