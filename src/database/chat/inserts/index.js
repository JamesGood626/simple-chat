const knex = require("../../index");

const CREATED = "CREATED";

const formatResponse = (status = "", result = {}) => {
  switch (status) {
    case CREATED:
      return [
        201,
        { message: "You've successfully created a new chat!", data: result }
      ];
    default:
      return [400, { message: "Whoops... Something went wrong." }];
  }
};

const saveChatToDatabase = chat => {
  return knex("chats")
    .returning(["name", "channel"])
    .insert(chat)
    .then(([chat_data]) => formatResponse(CREATED, chat_data))
    .catch(err => formatResponse());
};

module.exports = {
  saveChatToDatabase
};
