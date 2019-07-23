const express = require("express");
const router = express.Router();
const Chat = require("../../entities/chat");
const { createMessage } = require("../../database/chat/inserts");
const { fetchChat, fetchChatMessages } = require("../../database/chat/queries");

router.get("/messages/:channel", async function(req, res) {
  const { channel } = req.params;
  console.log("The channel in /chat/messages: ", channel);
  const [
    status,
    {
      data: { id }
    }
  ] = await fetchChat(channel);
  const messages = await fetchChatMessages(id);
  console.log("The emssages!: ", messages);
  res.status(200);
  res.send({ messages });
});

router.get("/:channel", async function(req, res) {
  const { channel } = req.params;
  console.log("the channel to be joined: ", channel);
  // TODO: Also, fetch all chat messages here
  //       to pass into ejs template.
  // Use vue.js component for chat/joining socket.io
  // channel & chat channel room.
  const [
    status,
    {
      data: { name }
    }
  ] = await fetchChat(channel);
  res.status(status);
  res.render("chat/index", {
    channel,
    name
  });
});

// Create a chat message
router.post("/messages/:channel", async function(req, res) {
  const { channel } = req.params;
  const { messageText } = req.body;
  const [
    status,
    {
      data: { id }
    }
  ] = await fetchChat(channel);
  const [statusTwo, data] = await createMessage(id, messageText);
  res.status(statusTwo);
  res.send(data);
});

module.exports = router;
