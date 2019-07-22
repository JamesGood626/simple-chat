const app = require("./app");
const server = require("http").createServer(app);

const io = require("socket.io")(server);

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
      // io.to(channel).emit("channel-joined", "You've joined the chat");
    });

    fn("woot");
  });

  socket.on("disconnecting", function(reason) {
    console.log("user disconnecting: ", reason);
  });
});

// io.on("btnclick", function(socket) {
//   console.log("a user clicked a btn");
// });

server.listen(4000, () => {
  console.log("simple-chat listening on localhost:4000");
});
