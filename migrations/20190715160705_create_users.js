exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {
      table.increments("id");
      table.string("user_name");
    })
    .alterTable("users", function(table) {
      table.unique("user_name");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
