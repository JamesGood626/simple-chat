const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const Chat = require("../../entities/chat");
const { fetchChats } = require("../../database/chat/queries");

// middleware that is specific to this router
// TODO: probably no harm in just moving this to the general middleware file.
router.use(csrf({ cookie: true }));

// error handler
router.use(function(err, req, res, next) {
  if (err.code !== "EBADCSRFTOKEN") return next(err);

  // handle CSRF token errors here
  res.status(403);
  res.json({ message: "form tampered with" });
});

router.get("/", async function(req, res) {
  const { user_name } = req.cookies.cookie;

  // TODO: implement better error handling to display
  //       message if chats weren't fetched.
  const [status, { data }] = await fetchChats();

  res.status(status);
  res.render("chatLobby/index", {
    user_name: user_name,
    chatList: data
  });
});

router.get("/new", async function(req, res) {
  res.status(200);
  res.render("chatLobby/newChat", {
    csrfToken: req.csrfToken()
  });
});

router.post("/new", async function(req, res) {
  const { chatName } = req.body;
  const chat = new Chat(chatName);
  const [status, _responseData] = await chat.saveToDatabase();

  console.log("STATUS OF THE SAVE: ", status);
  if (status === 201) {
    res.redirect("/chat-lobby");
  }
  if (status === 400) {
    // TODO: Show flash
    res.render("chatLobby/newChat", {
      csrfToken: req.csrfToken()
    });
  }
});

module.exports = router;
