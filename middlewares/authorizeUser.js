const jwt = require("jsonwebtoken");

const authorizeUser = async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return res.status(401).json({ message: "Unauthorized: missing token" });
  }
  const [, token] = authHeaders.split(" ");

  try {
    const userContext = jwt.verify(token, process.env.ADMIN_SECRET);

    req.user = userContext;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { authorizeUser };
