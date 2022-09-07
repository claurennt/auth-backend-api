const express = require("express");
const authRouter = express.Router();

const { authenticate_self } = require("../controllers/auth");
authRouter.post("/login", authenticate_self);

module.exports = authRouter;
