const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: { type: String, require: true },
  account: {
    username: String,
    name: String,
    description: String,
  },
  token: String,
  hash: String,
  salt: String,
});
module.exports = User;
