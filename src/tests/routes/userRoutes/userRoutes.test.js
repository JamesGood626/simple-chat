const request = require("supertest");
const app = require("../../../app");
const knex = require("../../../database");

afterEach(async () => {
  await knex("users").del();
});

afterAll(async () => {
  await knex("users").del();
});

describe("POST /user/signup", function() {
  it("creates user when provided with valid user input", async function(done) {
    const { status, body } = await request(app)
      .post("/user/signup")
      .send({ username: "userOne" })
      .set("Accept", "application/json");

    expect(status).toBe(201);
    expect(body.message).toBe("You've successfully signed up!");
    expect(body.data.user_name).toBe("userOne");
    done();
  });
});
