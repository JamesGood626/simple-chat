exports.up = function(knex, Promise) {
  return knex.schema.createTable("chats", function(table) {
    table.increments().primary();
    table.string("name").notNullable();
    table.string("channel").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("chats");
};
