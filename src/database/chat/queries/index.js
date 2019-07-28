const knex = require("../../index");

const RETRIEVED_CHATS = "RETRIEVED_CHATS";
const RETRIEVED_CHAT = "RETRIEVED_CHAT";

knex
  .raw("SELECT 'test connection';")
  .then(message => {
    // Success / boot rest of app
    console.log("Knex is connected");
  })
  .catch(err => {
    // Failure / timeout
    console.log("Knex is NOT connected");
    throw err;
  });

const formatResponse = (status = "", result = {}) => {
  switch (status) {
    case RETRIEVED_CHATS:
      return [200, { data: result }];
    case RETRIEVED_CHAT:
      return [200, { data: result }];
    default:
      return [400, { message: "Whoops... Something went wrong." }];
  }
};

const fetchChat = channel => {
  return knex
    .select("id", "name")
    .from("chats")
    .where("channel", channel)
    .then(([chat_data]) => formatResponse(RETRIEVED_CHAT, chat_data))
    .catch(err => {
      // log err
      return formatResponse();
    });
};

const fetchChats = () => {
  return knex
    .select("name", "channel")
    .from("chats")
    .then(chats_data => formatResponse(RETRIEVED_CHATS, chats_data))
    .catch(err => {
      // log err
      return formatResponse();
    });
};

const fetchChatMessages = id => {
  return knex
    .select("m.id", "m.text", "m.sender")
    .from("chats as c")
    .leftJoin("chat_messages as cm", "cm.chat_id", "c.id")
    .leftJoin("messages as m", "cm.message_id", "m.id")
    .where("c.id", "=", id);
};

module.exports = {
  fetchChats,
  fetchChat,
  fetchChatMessages
};
