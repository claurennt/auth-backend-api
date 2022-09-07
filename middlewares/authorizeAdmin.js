const jwt = require("jsonwebtoken");
const { ADMIN_SECRET } = process.env;

const authorizeAdmin = async (req, res, next) => {
  console.log(req.headers);
  const { token } = req.headers;
  if (!token) {
    return res.status(403).send("Missing token");
  }
  try {
    const userContext = jwt.verify(token, ADMIN_SECRET);
    if (userContext) {
      req.user = userContext;
      next();
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { authorizeAdmin };
