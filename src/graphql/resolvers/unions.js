module.exports = {
  Result: {
    __resolveType(obj, context, info) {
      if (obj.token) {
        return "AuthToken";
      }

      if (obj.errCode) {
        return "ErrorResponse";
      }

      return null;
    }
  }
};
