const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const { generateToken } = require("../../utils/helpers");

module.exports = {
  Query: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !bcrypt.compareSync(password, user.password)) return { errCode: 3, errDesc: "Bad credentials" };
      const token = generateToken(user);
      return { token };
    }
  },
  Mutation: {
    register: async (_, args) => {
      const { first_name, last_name, email, password, confirm_password } = args;
      const checkUser = await User.findOne({ email });
      if (checkUser) return { errCode: 1, errDesc: "Email already exists", fields: ["email"] };
      if (password !== confirm_password)
        return {
          errCode: 2,
          errDesc: "Passwords not match",
          fields: ["password", "confirm_password"]
        };
      const hashedPassword = bcrypt.hashSync(password);
      const user = new User({
        first_name,
        last_name,
        email,
        password: hashedPassword
      });
      await user.save();
      const token = generateToken(user);
      return { token };
    }
  }
};
