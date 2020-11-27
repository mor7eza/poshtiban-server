const { Schema, model } = require("mongoose");

const departmentSchema = new Schema({
  department: String
});

module.exports = model("Department", departmentSchema);
