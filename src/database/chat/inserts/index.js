const knex = require("../../index");

const CHAT_CREATED = "CHAT_CREATED";
const MESSAGE_CREATED = "MESSAGE_CREATED";

const formatResponse = (status = "", result = {}) => {
  switch (status) {
    case CHAT_CREATED:
      return [
        201,
        { message: "You've successfully created a new chat!", data: result }
      ];
    case MESSAGE_CREATED:
      return [201, { message: "Message sent!", data: result }];
    default:
      return [400, { message: "Whoops... Something went wrong." }];
  }
};

const saveChatToDatabase = chat => {
  return knex("chats")
    .returning(["name", "channel"])
    .insert(chat)
    .then(([chat_data]) => formatResponse(CHAT_CREATED, chat_data))
    .catch(err => formatResponse());
};

const createMessage = async (chatId, messageText, sender) => {
  const result = await knex("messages")
    .returning(["id", "text", "sender"])
    .insert({ text: messageText, sender })
    .then(([data]) => data)
    .catch(err => formatResponse());

  if (result.hasOwnProperty("id")) {
    return knex("chat_messages")
      .returning(["id"])
      .insert({ chat_id: chatId, message_id: result.id })
      .then(_ => formatResponse(MESSAGE_CREATED, result))
      .catch(err => formatResponse());
  } else {
    return formatResponse();
  }
};

module.exports = {
  saveChatToDatabase,
  createMessage
};
