require("dotenv").config();
require("./database/client.js");

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const app = express();
const cors = require("cors");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//custom headers need to be exposed to the client
//https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
//expressjs.com/en/resources/middleware/cors.html#:~:text=exposedHeaders%3A%20Configures%20the%20Access%2DControl%2DExpose%2DHeaders%20CORS%20header.%20Expects%20a%20comma%2Ddelimited%20string%20(ex%3A%20%E2%80%98Content%2DRange%2CX%2DContent%2DRange%E2%80%99)%20or%20an%20array%20(ex%3A%20%5B%27Content%2DRange%27%2C%20%27X%2DContent%2DRange%27%5D).%20If%20not%20specified%2C%20no%20custom%20headers%20are%20exposed.
app.use(cors({ exposedHeaders: "token" }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("something went wrong");
});

module.exports = app;
