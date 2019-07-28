const app = require("../../app");
const express = require("express");
const router = express.Router();
const Chat = require("../../entities/chat");
const { createMessage } = require("../../database/chat/inserts");
const { fetchChat, fetchChatMessages } = require("../../database/chat/queries");

router.get("/:channel", async function(req, res) {
  const userData = req.cookies.cookie;
  if (userData === undefined) {
    return res.redirect("/user/login");
  }
  const { channel } = req.params;

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

// Vue component calls this
// Get all messages for a given chat channel
router.get("/messages/:channel", async function(req, res) {
  const userData = req.cookies.cookie;
  if (userData === undefined) {
    res.status(302);
    return res.send({ redirectTo: "/user/login" });
  }
  const { channel } = req.params;
  const [
    status,
    {
      data: { id }
    }
  ] = await fetchChat(channel);
  const messages = await fetchChatMessages(id);
  // console.log("The emssages!: ", messages);
  res.status(200);
  res.send({ messages, user_name: userData.user_name });
});

// Vue component calls this
// Create a chat message
router.post("/messages/:channel", async function(req, res) {
  const userData = req.cookies.cookie;
  if (userData === undefined) {
    res.status(302);
    return res.send({ redirectTo: "/user/login" });
  }
  const { channel } = req.params;
  const { messageText } = req.body;
  const [
    status,
    {
      data: { id }
    }
  ] = await fetchChat(channel);
  const [statusTwo, data] = await createMessage(
    id,
    messageText,
    userData.user_name
  );

  const { io } = res.locals;
  io.to(channel).emit("new-chat-message", data);
  res.status(statusTwo);
  res.send(data);
});

module.exports = router;
