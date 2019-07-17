const express = require("express");
const router = express.Router();
const User = require("../../entities/user");

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

router.post("/signup", async function(req, res) {
  console.log("username on the request", req.body.username);
  const user = new User(req.body.username);
  if (user.username === undefined) {
    res.status(400);
    res.json({ message: "Please provide a valid username." });
  }
  // TODO: Handle case where username is invalid
  const [status, responseData] = await user.saveToDatabase();
  res.status(status);
  res.json(responseData);
});

router.get("/login", function(req, res) {
  res.json("Logging in...");
});

module.exports = router;
