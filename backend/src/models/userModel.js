const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  rePassword: { type: String, required: true },
  uuid: { type: String, required: true },
  role: { type: String, enum: ["Admin", "Student"], required: true },
  emailConfirmed: { type: Boolean, default: false },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
