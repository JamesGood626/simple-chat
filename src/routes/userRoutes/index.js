const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const User = require("../../entities/user");

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

router.get("/signup", function(req, res) {
  res.status(200);
  res.render("signup/index", {
    csrfToken: req.csrfToken()
  });
});

router.get("/login", function(req, res) {
  res.status(200);
  res.render("login/index", {
    csrfToken: req.csrfToken()
  });
});

// TODO: The return of this controller will need to be refactored to render a new page
// depending on the status.
router.post("/signup", async function(req, res) {
  const user = new User(req.body.username);
  if (user.username === undefined) {
    res.status(400);
    res.json({ message: "Please provide a valid username." });
  }
  const [_status, responseData] = await user.saveToDatabase();
  res.cookie("cookie", responseData.data);
  res.redirect("/chat-lobby");
});

router.post("/login", async function(req, res) {
  const user = new User(req.body.username);
  if (user.username === undefined) {
    // TODO: show a flash here
    res.render("login/index");
  }
  const [_status, responseData] = await user.findUser();
  if (
    responseData.message === "User not found." ||
    responseData.message === "Whoops... Something went wrong."
  ) {
    // TODO: show a flash here
    res.render("login/index");
    return;
  }

  res.cookie("cookie", responseData.data);
  res.redirect("/chat-lobby");
});

module.exports = router;
