const mongoose = require("mongoose");

module.exports = mongoose
  .connect(
    "mongodb+srv://admin-claudia:ofrldrg87ytBHmhE@cluster0.oot7e.mongodb.net/lecture-prep?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected successfully to MongoDB"))
  .catch((e) => console.log(e));
