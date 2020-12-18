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
        body: String,
        createdAt: { type: String, default: Date.now }
      }
    ],
    user: { type: ObjectId, ref: "User" },
    department: String,
    client: {
      osName: String,
      osVersion: String,
      browserName: String,
      browserVersion: String
    }
  },
  { timestamps: true }
);

module.exports = model("Ticket", ticketSchema);
