const User = require("../models/users");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.jwt) {
    return res.sendStatus(401);
  }

  const refreshToken = cookies.jwt;

  // find if user exists
  const existsUser = User.findByToken(refreshToken);

  if (!existsUser) {
    return res.sendStatus(403);
  } //Forbidden

  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || existsUser.email !== decoded.email) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      {
        user: {
          email: decoded.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );

    res.json({ accessToken });
  });
});

module.exports = { handleRefreshToken }