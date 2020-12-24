const { ObjectId, Schema, model } = require("mongoose");

const todoSchema = new Schema(
  {
    body: String,
    completed: { type: Boolean, default: false },
    user: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = model("Todo", todoSchema);
