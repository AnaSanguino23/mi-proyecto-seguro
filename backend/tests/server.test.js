const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const app = require("../server");

describe("Rutas protegidas", () => {
  it("Debe rechazar el acceso sin token", async () => {
    const res = await request(app).get("/perfil");
    expect(res.statusCode).toBe(401);
  });

  it("Debe permitir el acceso con token válido", async () => {
    const user = {
      id: "123",
      name: "Usuario Prueba",
      email: "prueba@email.com",
    };

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

    const res = await request(app)
      .get("/perfil")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.usuario.email).toBe(user.email);
  });
});
