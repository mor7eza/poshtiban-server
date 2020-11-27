const unions = require("./unions");
const userResolvers = require("./user");

module.exports = {
  ...unions,
  Query: { ...userResolvers.Query },
  Mutation: { ...userResolvers.Mutation }
};
