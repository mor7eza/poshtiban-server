const { ObjectId, Schema, model } = require("mongoose");

const logSchema = new Schema(
  {
    user: { type: ObjectId, ref: "User" },
    ticket: { type: ObjectId, ref: "Ticket" },
    action: String,
    detail: String
  },
  { timestamps: true }
);

module.exports = model("Log", logSchema);
