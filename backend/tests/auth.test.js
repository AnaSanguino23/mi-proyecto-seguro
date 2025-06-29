const request = require("supertest");
const app = require("../server"); // importa tu servidor desde server.js

describe("Pruebas de autenticación", () => {
  test("Debería registrar un usuario", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        username: "testuser",
        password: "testpassword",
      });

    expect(res.statusCode).toBe(201); // o 200, según tu implementación
    expect(res.body).toHaveProperty("message");
  });

  test("Debería iniciar sesión y devolver un token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        username: "testuser",
        password: "testpassword",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
