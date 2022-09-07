const User = require("../models/User");
const bcrypt = require("bcrypt");

const create_new_user = async (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).send("Please provide all the fields.");
  }
  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      return res
        .status(400)
        .send("Username and/or email are already being used");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const registeredUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = registeredUser.generateToken();
    res
      .set("token", token)
      .status(201)
      .json({
        message: "successfully created new admin",
        registeredUser: {
          username: registeredUser.username,
          _id: registeredUser._id,
          email: registeredUser.email,
        },
      });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const get_all_users = async (req, res, next) => {
  const allUsers = await User.find();
  res.status(200).send(allUsers);
};

const update_field_of_self = async (req, res, next) => {
  const me = req.user;

  const condition = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(me._id, condition, {
      new: true,
    });
    console.log(updatedUser);
    return res.status(200).json({ message: "Successfully updated user" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { create_new_user, get_all_users, update_field_of_self };
