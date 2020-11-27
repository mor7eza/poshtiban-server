const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID
    first_name: String
    last_name: String
    email: String
    password: String
    role: RoleEnum
    createdAt: String
    updatedAt: String
  }

  type Ticket {
    id: ID
    subject: String
    body: String
    priority: PriorityEnum
    status: StatusEnum
    comments: [Comment]
    user: User
    department: Department
    createdAt: String
    updatedAt: String
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
    createdAt: String
  }

  type Department {
    id: ID
    department: String
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
    CREATED
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

  union Result = AuthToken | ErrorResponse

  type Query {
    login(email: String, password: String): Result
  }

  type Mutation {
    register(first_name: String, last_name: String, email: String, password: String, confirm_password: String): Result
  }
`;
