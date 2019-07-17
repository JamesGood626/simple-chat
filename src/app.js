const express = require("express");
const applyMiddleware = require("./middleware");
const { userRoutes, chatLobbyRoutes } = require("./routes");
const app = express();

applyMiddleware(app);

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use("/user", userRoutes);
app.use("/chat-lobby", chatLobbyRoutes);

module.exports = app;
