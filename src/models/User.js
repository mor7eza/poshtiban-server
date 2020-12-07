const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    role: { type: String, default: "USER" },
    gender: Boolean,
    birthday: String,
    mobile: String
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
