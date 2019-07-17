const express = require("express");
const router = express.Router();

router.get("/", async function(req, res) {
  const { user_name } = req.cookies.cookie;

  res.render("chatLobby/index", {
    user_name: user_name
  });
});

module.exports = router;
