const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: false,
    },
    refreshToken: String,
  },
  {
    statics: {
      findByEmail(email) {
        return this.findOne({ email }).exec();
      },
      findByToken(refreshToken) {
        return this.findOne({ refreshToken }).exec();
      },
    },
  }
);

module.exports = mongoose.model("User", userSchema);
