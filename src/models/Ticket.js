const { ObjectId, Schema, model } = require("mongoose");

const ticketSchema = new Schema(
  {
    subject: String,
    body: String,
    priority: { type: String, default: "LOW" },
    status: { type: String, default: "OPEN" },
    comments: [
      {
        user: { type: ObjectId, ref: "User" },
        createdAt: { type: String, default: Date.now }
      }
    ],
    user: { type: ObjectId, ref: "User" },
    department: { type: ObjectId, ref: "Department" }
  },
  { timestamps: true }
);

module.exports = model("Ticket", ticketSchema);
