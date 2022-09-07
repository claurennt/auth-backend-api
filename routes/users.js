const express = require("express");
const usersRouter = express.Router();
const {
  create_new_user,
  get_all_users,
  update_field_of_self,
} = require("../controllers/users");
const { authorizeAdmin } = require("../middlewares/authorizeAdmin");

usersRouter.post("/register", create_new_user);
usersRouter.get("/", authorizeAdmin, get_all_users);
usersRouter.patch("/me", authorizeAdmin, update_field_of_self);
module.exports = usersRouter;
