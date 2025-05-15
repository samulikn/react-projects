const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// desc Login
// route POST /auth
const handleLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "User and password are required!" });
  }

  //check if user exists
  const existsUser = await User.findByEmail(email);
  if (!existsUser) {
    return res.sendStatus(401); // Unauthorized
  }

  // evaluate password
  const match = await bcrypt.compare(password, existsUser.password);

  if (match) {
    // create JWTs
    const accessToken = jwt.sign(
      {
        user: {
          email: existsUser.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );

    const refreshToken = jwt.sign(
      {
        user: {
          email: existsUser.email,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Saving refreshToken with current user
    existsUser.refreshToken = refreshToken;
    const result = await existsUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.status(401).json({ message: "Unauthorized!" });
  }
});

// desc Refresh
// route GET /auth/refresh
const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const refreshToken = cookies.jwt;

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const existsUser = await User.findByToken(refreshToken);
      if (!existsUser) {
        return res.status(401).json({ message: "Unauthorized." });
      }

      const accessToken = jwt.sign(
        {
          user: {
            email: existsUser.email,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ accessToken });
    })
  );
};

// desc Logout
// route POST /auth/logout
const logout = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(204).json({ message: "No content" });
  }

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared." });
};

module.exports = { handleLogin, refresh, logout };
