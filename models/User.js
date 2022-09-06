const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const { ADMIN_SECRET, USER_SECRET } = process.env;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, default: "admin", enum: ["user", "admin"] },
});

userSchema.methods.createToken = function () {
  const payload = {
    username: this.username,
    _id: this._id,
    email: this.email,
    role: this.role,
  };

  const token =
    this.role === "user"
      ? jwt.sign(payload, USER_SECRET)
      : jwt.sign(payload, ADMIN_SECRET);

  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
