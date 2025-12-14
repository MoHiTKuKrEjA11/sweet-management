import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import app from "../src/app.js";

describe("Auth API", () => {
  const user = {
    email: `test${Date.now()}@example.com`,
    password: "password123",
  };

  it("should register a user", async () => {
    const res = await request(app).post("/api/auth/register").send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.role).toBe("USER");
  });

  it("should not allow duplicate email", async () => {
    const tempUser = {
      email: "admin@example.com",
      password: "password123",
    };
    const res = await request(app).post("/api/auth/register").send(tempUser);

    expect(res.statusCode).toBe(400);
  });

  it("should login user", async () => {
    const res = await request(app).post("/api/auth/login").send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
