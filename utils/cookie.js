const attachCookiesToResponse = ({ res, token }) => {
  res.cookie("token", token, {
    httpOnly: true,
    signed: true,
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
  });
};

module.exports = { attachCookiesToResponse };
