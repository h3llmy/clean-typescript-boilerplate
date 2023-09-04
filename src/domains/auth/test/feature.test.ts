import * as request from "supertest";
import server from "../../../server";

describe("Feature / auth / register", () => {
  it("should respond token", async () => {
    const response = await request(server).post("/api/v1/auth/register").send({
      email: "heynamusicid@gmail.com",
      username: "mantaps",
      password: "123123123",
      confirmPassword: "123123123",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
