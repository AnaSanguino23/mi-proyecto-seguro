describe("Autenticación con Google", () => {
  it("Debe mostrar el botón de Login con Google y redirigir correctamente", () => {
    cy.visit("http://localhost:3000"); // Cambia si usas otro puerto

    cy.contains("Login con Google").should("be.visible").click();

    cy.url().should("include", "accounts.google.com"); // Valida la redirección
  });
});
