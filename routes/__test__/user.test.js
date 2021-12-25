const app = require("../../app");
const request = require("supertest");

it("it should expect 201", async () => {
  return request(app)
    .post("/api/user/register")
    .send({
      name: "Anshu Rai",
      email: "test@test.com",
      password: "test1234",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(201);
});
