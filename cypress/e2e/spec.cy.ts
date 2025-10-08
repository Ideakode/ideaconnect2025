describe("Available for Connections (Stranger)", () => {
  it("Checks if the Available for Connections flag is OK and leaves it active", () => {
    cy.visit("https://localhost:3000/agent");

    cy.get("#allow_clients_checkbox_image").should(
      "have.class",
      "display_none"
    );

    cy.get("#allow_clients_checkbox").click();

    cy.get("#allow_clients_checkbox_image").should(
      "not.have.class",
      "display_none"
    );
  });
  it("Checks if Stranger can see the Agent after it became available", () => {
    cy.visit("https://localhost:3000/stranger");

    cy.contains("#agent_list p").should("have.length", 1);
  });
});
