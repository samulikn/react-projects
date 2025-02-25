const User = require("../models/users");
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');

// desc: get all users from MongoDB
// route: GET
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().lean();
  if (!users.length) {
    return res.status(400).json({ message: "No data found! " });
  }
  res.json(users);
});

// desc: Create new user
// route: POST
const createNewUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, dateOfBirth } = req.body;
  

  if (!email || !password || !firstName || !lastName) {
    return res
      .status(400)
      .json({ message: "email, password, first and last names are required fields!" });
  }

  // check for duplicate data
  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: `Duplicate e-mail ${email}. User has already exists.` });
  }

  const hashedPwd = await bcrypt.hash(password, 10); // hash password

  const newUser = { email, "password": hashedPwd, firstName, lastName, dateOfBirth };

  const user = await User.create(newUser);

  if (user) {
    res.status(201).json({ message: `New user ${email} created.` });
  } else {
    res.status(400).json({ message: "Invalid user data!" });
  }
});

// desc: Update user
// route: PATCH
const updateUser = asyncHandler(async (req, res) => {
  const { id, email, firstName, lastName, dateOfBirth } = req.body;

  if (!id || !email || !firstName || !lastName) {
    return res
      .status(400)
      .json({ message: "email, first and last names are required!" });
  }

  const user = await User.findById({_id: id}).exec();

  if (!user) {
    return res.status(400).json({ message: `User not found!` });
  }

  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate && duplicate._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate email' })
  }

  user.email = email
  user.firstName = firstName
  user.lastName = lastName
  user.dateOfBirth = dateOfBirth;

  const updatedUser = await user.save();

  res.status(201).json({ message: `User ${email} updated!` });
});

// desc: Delete user
// route: DELETE
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "id is required!" });
  }

  const user = await User.findById({_id: id}).exec();

  if (!user) {
    return res.status(400).json({ message: `User not found!` });
  }

  const deletedUser = await user.deleteOne();
  res.json({ message: `User was deleted!` });
});

// // desc: Get user by Id
// // route: GET /:user
// const getUserById = asyncHandler(async (req, res) => {
//     const { id, email } = req.params;
// })

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
