const express = require("express");
const applyMiddleware = require("./middleware");
const { userRoutes } = require("./routes");
const app = express();

applyMiddleware(app);
app.use("/user", userRoutes);

module.exports = app;
