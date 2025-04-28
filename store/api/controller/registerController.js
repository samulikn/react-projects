const User = require("../models/users");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const handleNewUser = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, birthday } = req.body;

  if (!email || !password || !firstname || !lastname) {
    return res
      .status(400)
      .json({
        message: "email, password, first and last names are required fields!",
      });
  }

  // check for duplicate data
  const duplicate = await User.findByEmail({email});

  if (duplicate) {
    return res
      .status(409)
      .json({ message: `Duplicate e-mail ${email}. User has already exists.` });
  }

  const hashedPwd = await bcrypt.hash(password, 10); // hash password

  const newUser = { email, password: hashedPwd, firstname, lastname, birthday };

  const user = await User.create(newUser);

  if (user) {
    res.status(201).json({ message: `New user ${email} created.` });
  } else {
    res.status(400).json({ message: "Invalid user data!" });
  }
});

module.exports = { handleNewUser };
