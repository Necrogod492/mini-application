const request = require("supertest");
const app = require("./app");

let server;

beforeAll((done) => {
  server = app.listen(3000, () => {
    console.log("Server running for tests");
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

test("GET /", async () => {
  const response = await request(server).get("/");
  expect(response.statusCode).toBe(200);
  expect(response.text).toBe("Hello World!");
});
