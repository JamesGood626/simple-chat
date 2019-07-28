const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const applyMiddleware = require("./middleware");
const {
  homeRoutes,
  userRoutes,
  chatLobbyRoutes,
  chatRoutes
} = require("./routes");

applyMiddleware(app);

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static(__dirname + "/public"));

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("btnclick", function() {
    console.log("btnclicked");
    socket.emit("btnclick-response", { message: "You've got mail" });
  });

  // server:
  socket.on("join-chat", (channel, fn) => {
    console.log("wtf is channel? ", channel);
    // fetch chat w/ messages from db
    // call that data with woot.
    // subscribe?
    socket.join(channel, () => {
      // HOW YOU'LL EMIT MESSAGES TO OTHERS IN THE CHAT
      io.to(channel).emit("channel-joined", "You've joined the chat");
    });

    fn("woot");
  });

  socket.on("disconnecting", function(reason) {
    console.log("user disconnecting: ", reason);
  });
});

app.use(function(req, res, next) {
  res.locals.message = "YOU GOT IT!";
  res.locals.io = io;
  next();
});
app.use("/", homeRoutes);
app.use("/user", userRoutes);
app.use("/chat-lobby", chatLobbyRoutes);
app.use("/chat", chatRoutes);

// Doesn't export until a user actually connect to the socket
// console.log("exporting channelEmit: ", channelEmit);
module.exports = server;
