const Ticket = require("../../models/Ticket");
const User = require("../../models/User");

module.exports = {
  Query: {
    getTickets: async () => {
      const tickets = await Ticket.find().populate("user").exec();
      return tickets;
    },
    getTicket: async (_, { ticketId }) => {
      const ticket = await Ticket.findById(ticketId).populate("user").exec();
      return ticket;
    }
  },
  Mutation: {
    createTicket: async (
      _,
      { userId, subject, department, priority, status, body, osName, osVersion, browserName, browserVersion }
    ) => {
      const user = await User.findById(userId);
      const client = { osName, osVersion, browserName, browserVersion };
      const ticket = new Ticket({
        subject,
        department,
        priority,
        status,
        body,
        user,
        client
      });
      await ticket.save();
      return { code: 201, success: true };
    }
  }
};
