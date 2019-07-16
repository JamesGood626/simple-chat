const knex = require("../../index");

const CREATED = "CREATED";
const USERNAME_TAKEN = "USERNAME_TAKEN";

const formatResponse = (status = "", result = {}) => {
  switch (status) {
    case CREATED:
      return [201, { message: "You've successfully signed up!", data: result }];
    case USERNAME_TAKEN:
      return [400, { message: "That username is already taken" }];
    default:
      return [400, { message: "Whoops... Something went wrong." }];
  }
};

const saveUserToDatabase = user => {
  return knex("users")
    .returning(["id", "user_name"])
    .insert(user)
    .then(([user_data]) => formatResponse(CREATED, user_data))
    .catch(err => {
      if (err.constraint === "users_user_name_unique") {
        return formatResponse(USERNAME_TAKEN);
      }
      return formatResponse();
    });
};

module.exports = {
  saveUserToDatabase
};
