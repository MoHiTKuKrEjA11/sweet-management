import { describe, it, expect, beforeAll } from "@jest/globals";
import request from "supertest";
import app from "../src/app.js";

let adminToken;
let sweetId;

beforeAll(async () => {
  const res = await request(app).post("/api/auth/login").send({
    email: "admin@example.com",
    password: "123",
  });

  adminToken = res.body.token;
}, 20000);

describe("Sweets API", () => {
  it("should add a sweet (admin)", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Test Chocolate",
        category: "Chocolate",
        price: 10,
        quantity: 20,
      });

    sweetId = res.body.id;
    expect(res.statusCode).toBe(201);
  });

  it("should get all sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should purchase sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ amount: 2 });

    expect(res.statusCode).toBe(200);
  });

  it("should restock sweet (admin)", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ amount: 5 });

    expect(res.statusCode).toBe(200);
  });

  it("should delete sweet (admin)", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });
});
