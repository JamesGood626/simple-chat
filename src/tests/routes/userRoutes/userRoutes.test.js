const request = require("supertest");
const app = require("../../../app");
const knex = require("../../../database");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

afterEach(async () => {
  await knex("users").del();
});

afterAll(async () => {
  await knex("users").del();
  knex.destroy();
});

describe("GET /user/signup", function() {
  it("Returns the signup html", async function(done) {
    const result = await request(app).get("/user/signup");

    expect(result.status).toBe(200);
    // TODO: Implement better expects
    expect(typeof result.text === "string").toBe(true);
    done();
  });
});

describe("POST /user/signup", function() {
  let token;
  let cookies;

  beforeEach(done => {
    request(app)
      .get("/user/signup")
      .end((err, resp) => {
        // getting cookies
        cookies = resp.headers["set-cookie"];
        // extracting token
        const dom = new JSDOM(resp.text);
        token = dom.window.document.getElementsByName("_csrf")[0].value;
        done();
      });
  });

  it("creates user when provided with valid user input", async function(done) {
    const { status, body, text } = await request(app)
      .post("/user/signup")
      .type("form")
      .set("Cookie", cookies)
      .send({ username: "userOne", _csrf: token });

    expect(status).toBe(302);
    expect(text).toBe("Found. Redirecting to /chat-lobby");
    done();
  });
});
