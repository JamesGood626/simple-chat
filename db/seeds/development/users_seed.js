exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex("users").del();
  // Inserts seed entries
  await knex("users").insert({ user_name: "userOne" });
  await knex("users").insert({ user_name: "userTwo" });
  await knex("users").insert({ user_name: "userThree" });
};
