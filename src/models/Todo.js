const { ObjectId, Schema, model } = require("mongoose");

const todoSchema = new Schema(
  {
    todo: String,
    completed: Boolean,
    user: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = model("Todo", todoSchema);
