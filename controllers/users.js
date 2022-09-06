const bcrypt = require("bcrypt");
const User = require("../models/User");

const register_new_user = async (req, res, next) => {
  const { email, password, username, role } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: "Missing fields" });
  }
  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      return res.status(400).json({
        message: "User with this username and/or email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const registeredUser = await User.create({
      email,
      password: hashedPassword,
      username,
      role: role && role,
    });

    const token = registeredUser.createToken();

    return res
      .set("x-authorization-token", token)
      .status(201)
      .send("Successfully created new user");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const get_user_context = async (req, res, next) => {
  const { user } = req;
  return res.status(200).send(user);
};

const update_field_of_user = async (req, res, next) => {
  const { user } = req;

  const condition = Object.entries(req.body);

  if (!condition.length) {
    return res.status(400).json({ message: "Missing fields" });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {
      new: true,
    });

    return res.status(200).send(updatedUser);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports = { register_new_user, get_user_context, update_field_of_user };
