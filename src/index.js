const express = require("express");
const applyMiddleware = require("./middleware");
const app = express();

applyMiddleware(app);

const { development } = require("../knexfile");
const knex = require("knex")(development);

// const handleTableCreation = (knex, tableName, createTableCallback) => {
//   knex.schema.hasTable(tableName).then(exists => {
//     if (!exists) {
//       return knex.schema.createTable(tableName, createTableCallback);
//     }
//   });
// };

// handleTableCreation(knex, "users", table => {
//   table.increments("id");
//   table.string("user_name");
// });

// knex.schema.hasTable("users").then(function(exists) {
//   if (!exists) {
//     return knex.schema
//       .createTable("users", function(table) {
//         table.increments("id");
//         table.string("user_name");
//       })
//       .then(function() {
//         return knex("users").insert({ user_name: "Tim" });
//       });
//   }
// });

app.listen(4000, () => {
  console.log("simple-chat listening on localhost:4000");
});
