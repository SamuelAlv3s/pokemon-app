describe("App Testing", () => {
  beforeEach(() => {
    cy.viewport(393, 851);
  });

  it("should shows the default page", () => {
    cy.visit("/");
    cy.get("ion-item").should("have.length", "25");
  });

  it("should change color of favorite item when is clicked", () => {
    cy.get("ion-item").eq(0).find("ion-button").click({ force: true });
    cy.get("ion-item")
      .eq(0)
      .find("ion-button ion-icon")
      .should("have.class", "ion-color-warning");
  });

  it("should page pokemon details", () => {
    cy.get("ion-item").eq(0).click({ force: true });
    cy.get("ion-card").find("ion-img").should("be.visible");
  });
});
