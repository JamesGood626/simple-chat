const express = require("express");
const app = express();
const applyMiddleware = require("./middleware");
const { userRoutes, chatLobbyRoutes } = require("./routes");

applyMiddleware(app);

app.set("view engine", "ejs");
app.set("views", "./src/views");
// app.use(express.static(__dirname + "/public"));

app.use("/user", userRoutes);
app.use("/chat-lobby", chatLobbyRoutes);

module.exports = app;
