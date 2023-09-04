import * as request from "supertest";
import server from "../../../server";

describe("Feature / user / list", () => {
  it("should respond user", async () => {
    const response = await request(server).get("/api/v1/user/list");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
});
