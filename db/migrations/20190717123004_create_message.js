exports.up = function(knex, Promise) {
  return knex.schema.createTable("messages", function(table) {
    table.increments().primary();
    table.string("text").notNullable();
    table.string("sender").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("messages");
};
