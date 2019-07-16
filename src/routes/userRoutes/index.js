const express = require("express");
const router = express.Router();
const User = require("../../entities/user");

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

router.post("/signup", async function(req, res) {
  const user = new User(req.body.username);
  const [status, responseData] = await user.saveToDatabase();
  res.status(status);
  res.send(responseData);
});

router.get("/login", function(req, res) {
  res.send("Logging in...");
});

module.exports = router;
