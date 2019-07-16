const app = require("./app");
const applyMiddleware = require("./middleware");
const { userRoutes } = require("./routes");

applyMiddleware(app);
app.use("/user", userRoutes);

app.listen(4000, () => {
  console.log("simple-chat listening on localhost:4000");
});
