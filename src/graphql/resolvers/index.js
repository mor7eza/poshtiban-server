const unions = require("./unions");
const userResolvers = require("./user");
const ticketResolvers = require("./ticket");

module.exports = {
  ...unions,
  Query: { ...userResolvers.Query, ...ticketResolvers.Query },
  Mutation: { ...userResolvers.Mutation, ...ticketResolvers.Mutation }
};
