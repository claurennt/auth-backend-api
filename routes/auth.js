var express = require("express");
var router = express.Router();

const { authenticate_self } = require("../controllers/auth");

router.post("/login", authenticate_self);

module.exports = router;
