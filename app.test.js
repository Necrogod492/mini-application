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

test("POST /add", async () => {
  const response = await request(server)
    .post("/add")
    .send({ a: 5, b: 50 });

  expect(response.statusCode).toBe(200);
});

test("POST /add wrong input", async () => {
  const response = await request(server)
    .post("/add")
    .send({ a: "pikapika", b: 263 });

  expect(response.statusCode).toBe(500);
  expect(response.body.error).toBe(
    "Invalid input, it seems that one of the 2 input fields is not a number"
  );
});

test("POST /multiply", async () => {
  const response = await request(server)
    .post("/multiply")
    .send({ a: 5, b: 50 });

  expect(response.statusCode).toBe(200);
});

test("POST /multiply wrong input", async () => {
  const response = await request(server)
    .post("/multiply")
    .send({ a: "test", b: 75 });

  expect(response.statusCode).toBe(500);
  expect(response.body.error).toBe(
    "Invalid input, it seems that one of the 2 input fields is not a number"
  );
});
