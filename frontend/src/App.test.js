import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renderiza el componente App con el texto Iniciar sesión", () => {
  render(<App />);
  const texto = screen.getByText(/Iniciar sesión/i);
  expect(texto).toBeInTheDocument();
});
