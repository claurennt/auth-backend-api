var express = require("express");
var router = express.Router();

const { authorizeUser } = require("../middlewares/authorizeUser");

const {
  register_new_user,
  get_user_context,
  update_field_of_user,
} = require("../controllers/users");

router.post("/register", register_new_user);

router
  .route("/me")
  .get(authorizeUser, get_user_context)
  .patch(authorizeUser, update_field_of_user);

module.exports = router;
