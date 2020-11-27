const _ = require("lodash");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../../config");

module.exports.generateToken = (userData) => {
  const user = _.pick(userData, ["id", "first_name", "last_name"]);
  const token = jwt.sign(user, SECRET_KEY, { expiresIn: "24h" });
  return token;
};
