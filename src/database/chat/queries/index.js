const knex = require("../../index");

const RETRIEVED_CHATS = "RETRIEVED_CHATS";

const formatResponse = (status = "", result = {}) => {
  switch (status) {
    case RETRIEVED_CHATS:
      return [201, { data: result }];
    default:
      return [400, { message: "Whoops... Something went wrong." }];
  }
};

const fetchChats = () => {
  return knex
    .select("name", "channel")
    .from("chats")
    .then(chats_data => formatResponse(RETRIEVED_CHATS, chats_data))
    .catch(err => {
      return formatResponse();
    });
};

module.exports = {
  fetchChats
};
