const knex = require("../../index");

const FOUND_USER = "FOUND_USER";
const USER_NOT_FOUND = "USER_NOT_FOUND";

const formatResponse = (status = "", result = {}) => {
  switch (status) {
    case FOUND_USER:
      return [201, { data: result }];
    case USER_NOT_FOUND:
      return [400, { message: "User not found." }];
    default:
      return [400, { message: "Whoops... Something went wrong." }];
  }
};

const findUser = username => {
  return knex
    .select("id", "user_name")
    .from("users")
    .where("user_name", username)
    .then(([user_data]) => formatResponse(FOUND_USER, user_data))
    .catch(err => {
      return formatResponse();
    });
};

module.exports = {
  findUser
};
