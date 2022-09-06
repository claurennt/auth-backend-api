const bcrypt = require("bcrypt");
const User = require("../models/User");

const authenticate_self = async (req, res, next) => {
  const { username, password } = req.body;

  if (!password || !username) {
    return res.status(400).json({ message: "Missing fields" });
  }
  try {
    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return res.status(400).json({
        message: "No user registered with the provided username",
      });
    }

    const isPasswordSame = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordSame) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const token = foundUser.createToken();

    return res
      .set("x-authorization-token", token)
      .status(200)
      .send("Successfully authenticated");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { authenticate_self };
