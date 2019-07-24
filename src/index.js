const server = require("./app");

const port = process.env.NODE_ENV === "test" ? 5000 : 4000;
server.listen(port, () => {
  console.log("simple-chat listening on localhost:4000");
});
