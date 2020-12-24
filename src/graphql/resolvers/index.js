const unions = require("./unions");
const userResolvers = require("./user");
const ticketResolvers = require("./ticket");
const todoResolvers = require("./todo");

module.exports = {
  ...unions,
  Query: { ...userResolvers.Query, ...ticketResolvers.Query, ...todoResolvers.Query },
  Mutation: { ...userResolvers.Mutation, ...ticketResolvers.Mutation, ...todoResolvers.Mutation }
};
