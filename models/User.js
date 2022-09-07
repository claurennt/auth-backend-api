const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const { ADMIN_SECRET } = process.env;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, default: "admin" },
});

userSchema.methods.generateToken = function () {
  const payload = {
    _id: this._id,
    username: this.username,
    email: this.email,
  };

  const token = jwt.sign(payload, ADMIN_SECRET);
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
