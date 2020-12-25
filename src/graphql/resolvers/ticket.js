const Ticket = require("../../models/Ticket");
const User = require("../../models/User");
const { DateTime } = require("luxon");

module.exports = {
  Query: {
    getTickets: async () => {
      const tickets = await Ticket.find().populate("user").exec();
      return tickets;
    },
    getTicket: async (_, { ticketId }) => {
      const ticket = await Ticket.findById(ticketId).populate("user").populate("comments.user").exec();
      return ticket;
    },
    getDashboardStatus: async () => {
      const open = await Ticket.countDocuments({ status: "OPEN" });
      const pending = await Ticket.countDocuments({ status: "PENDING" });
      const resolved = await Ticket.countDocuments({ status: "RESOLVED" });
      const closed = await Ticket.countDocuments({ status: "CLOSED" });
      return [open, pending, resolved, closed];
    },
    getDepartmentsStatus: async () => {
      const tickets = await Ticket.find({}, "department status");
      const departments = await Ticket.distinct("department");
      const departmentsStatus = [];
      departments.map((department) => {
        let open = 0;
        let pending = 0;
        tickets.map((ticket) => {
          if (ticket.department === department && ticket.status === "OPEN") open++;
          if (ticket.department === department && ticket.status === "PENDING") pending++;
        });
        departmentsStatus.push({ name: department, open, pending });
      });
      return departmentsStatus;
    },
    getChartData: async () => {
      const tickets = await Ticket.find({}, "createdAt");
      const ticketsDates = tickets.map((ticket) => {
        const date = new Date(ticket.createdAt);
        const newDate = DateTime.fromISO(date.toISOString()).toISODate();
        return newDate;
      });
      return ticketsDates;
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
    },
    addComment: async (_, { ticketId, userId, body }) => {
      let ticket = await Ticket.findById(ticketId);
      const user = await User.findById(userId);
      ticket.comments.push({ user, body });
      await ticket.save();
      return {
        code: 201,
        success: true
      };
    },
    changeTicketPriority: async (_, { ticketId, priority }) => {
      await Ticket.findByIdAndUpdate(ticketId, { priority });
      return {
        code: 200,
        success: true
      };
    },
    changeTicketStatus: async (_, { ticketId, status }) => {
      await Ticket.findByIdAndUpdate(ticketId, { status });
      return {
        code: 200,
        success: true
      };
    }
  }
};
