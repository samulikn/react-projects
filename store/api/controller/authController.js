const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const handleLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "User and password are required!" });
  }

  //check if user exists
  const existsUser = await User.findOne({ email });
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
          // firstname: existsUser.firstname,
          // lastname: existsUser.lastname,
          // birthday: existsUser.birthday,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );

    const refreshToken = jwt.sign(
      {
        user: {
          email: existsUser.email,
          // firstname: existsUser.firstname,
          // lastname: existsUser.lastname,
          // birthday: existsUser.birthday,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    // Saving refreshToken with current user
    existsUser.refreshToken = refreshToken;
    const result = await existsUser.save();
    // console.log(result); // for testing

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
});

module.exports = { handleLogin };
