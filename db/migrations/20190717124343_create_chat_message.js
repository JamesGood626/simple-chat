exports.up = function(knex, Promise) {
  return knex.schema.createTable("chat_messages", function(table) {
    table.increments();
    table
      .integer("chat_id")
      .unsigned()
      .notNullable();
    table
      .integer("message_id")
      .unsigned()
      .notNullable();

    table
      .foreign("chat_id")
      .references("id")
      .inTable("chats");
    table
      .foreign("message_id")
      .references("id")
      .inTable("messages");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("chat_messages");
};
