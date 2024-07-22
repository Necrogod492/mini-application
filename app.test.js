const request = require("supertest");
const app = require("./app"); // Assurez-vous que l'import est correct

test("GET /", async () => {
  const response = await request(app).get("/");
  expect(response.statusCode).toBe(200);
  expect(response.text).toBe("Hello World!");
});
