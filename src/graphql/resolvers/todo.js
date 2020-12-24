const Todo = require("../../models/Todo");
const { find } = require("../../models/User");
const User = require("../../models/User");

module.exports = {
  Query: {
    getTodos: async (_, { userId }) => {
      const user = await User.findById(userId);
      const todos = await Todo.find({ user, completed: false });
      return todos;
    }
  },
  Mutation: {
    addTodo: async (_, { userId, body }) => {
      const user = await User.findById(userId);
      const todo = new Todo({
        body,
        user
      });
      await todo.save();
      return {
        code: 201,
        success: true
      };
    },
    completeTodo: async (_, { todoId }) => {
      let todo = await Todo.findById(todoId);
      todo.completed = !todo.completed;
      await todo.save();
      return {
        code: 200,
        success: true
      };
    }
  }
};
