const { Unauthenticated, Unauthorize } = require("../errors");
const { decodeToken } = require("../utils");

const authenticate = async (req, res, next) => {
  const { token } = req.signedCookies;
  if (!token) {
    throw new Unauthenticated("No token provided");
  }
  try {
    const payload = decodeToken(token);

    req.user = {
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    };
    next();
  } catch (error) {
    throw new Unauthenticated("Invalid Token");
  }
};
const authorizePermission = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }
    throw new Unauthorize("Permission Denied");
  };
};

module.exports = { authenticate, authorizePermission };
