const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID
    first_name: String
    last_name: String
    email: String
    password: String
    role: RoleEnum
    gender: Boolean
    birthday: String
    mobile: String
    createdAt: String
    updatedAt: String
  }

  input UserInput {
    id: String
    first_name: String
    last_name: String
    role: RoleEnum
    gender: Boolean
    birthday: String
    mobile: String
  }

  type Ticket {
    id: ID
    subject: String
    body: String
    priority: PriorityEnum
    status: StatusEnum
    comments: [Comment]
    user: User
    department: String
    client: Client
    createdAt: String
    updatedAt: String
  }

  type Client {
    osName: String
    osVersion: String
    browserName: String
    browserVersion: String
  }

  type Log {
    user: User
    ticket: Ticket
    action: ActionEnum
    detail: String
    createdAt: String
    updatedAt: String
  }

  type Todo {
    todo: String
    completed: Boolean
    user: User
    createdAt: String
    updatedAt: String
  }

  type Comment {
    user: User
    body: String
    createdAt: String
  }

  enum RoleEnum {
    ADMIN
    AGENT
    USER
  }

  enum PriorityEnum {
    URGENT
    HIGH
    NORMAL
    LOW
  }

  enum StatusEnum {
    OPEN
    PENDING
    RESOLVED
    CLOSED
  }
  enum ActionEnum {
    REGISTERED
    REPLIED
    CHANGE_STATUS
    CHANGE_PRIORITY
    CHANGE_DEPARTMENT
  }

  type AuthToken {
    token: String
  }

  type ErrorResponse {
    errCode: Int
    errDesc: String
    fields: [String]
  }

  type MutationResponse {
    code: Int
    success: Boolean
    message: String
  }

  union Result = AuthToken | ErrorResponse

  type Query {
    getUsers: [User]
    getUser(id: String): User
    getTickets: [Ticket]
    getTicket(ticketId: String): Ticket
  }

  type Mutation {
    login(email: String, password: String): Result
    register(first_name: String, last_name: String, email: String, password: String, confirm_password: String): Result
    deleteUser(id: String): MutationResponse
    editUser(user: UserInput): MutationResponse
    createTicket(
      userId: String
      subject: String
      priority: PriorityEnum
      status: StatusEnum
      body: String
      department: String
      osName: String
      osVersion: String
      browserName: String
      browserVersion: String
    ): MutationResponse
  }
`;
