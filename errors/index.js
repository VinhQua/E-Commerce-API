const CustomAPIError = require("./custom-error");
const BadRequest = require("./bad-request");
const Unauthenticated = require("./unauthenticate");
const NotFound = require("./not-found");
const Unauthorize = require("./unauthorize");
module.exports = {
  CustomAPIError,
  BadRequest,
  Unauthenticated,
  NotFound,
  Unauthorize,
};
