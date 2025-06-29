import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "./Dashboard";

// Simulación del hook personalizado useUser
jest.mock("./useUser", () => () => ({
  user: {
    name: "Anna",
    email: "anna@example.com",
  },
  loading: false,
}));

test("renderiza correctamente el Dashboard con datos simulados", async () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );

  // Espera hasta que el contenido aparezca en la pantalla
  const bienvenida = await screen.findByText(/Bienvenida/i);
  const email = await screen.findByText(/anna@example.com/i);

  expect(bienvenida).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
