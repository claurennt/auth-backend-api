const mongoose = require("mongoose");

const { MONGO_CONNECTION_STRING } = process.env;
module.exports = mongoose
  .connect(MONGO_CONNECTION_STRING)
  .then(() => console.log("Connected successfully to MongoDB"))
  .catch((e) => console.log(e));
