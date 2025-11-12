describe('VueFinder E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    // Wait for Vue app to mount
    cy.wait(2000);
  });

  it('should render VueFinder and switch to ArrayDriver example', () => {
    // Wait for page to load and example selector to be visible
    cy.get('#example').should('exist').should('be.visible');
    
    // Check VueFinder exists on page load (VueFinder component has class "vuefinder")
    cy.get('.vuefinder', { timeout: 10000 }).should('exist').should('be.visible');
    
    // Switch to ArrayDriver example
    cy.get('#example').select('arrayDriver');
    cy.wait(1500);
    
    // Verify ArrayDriver VueFinder instance exists (should still have vuefinder class)
    cy.get('.vuefinder', { timeout: 5000 }).should('exist');
  });

  it('should display files and allow folder navigation', () => {
    // Switch to ArrayDriver example
    cy.get('#example').select('arrayDriver');
    cy.wait(1500);
    
    // ArrayDriver has 'docs' folder at root - verify it's displayed
    cy.get('[data-key="memory://docs"]', { timeout: 3000 }).should('exist');
    
    // Double-click on the docs folder to navigate into it
    cy.get('[data-key="memory://docs"]').dblclick();
    cy.wait(1000);
    
    // After navigation, should see readme.txt file inside docs folder
    cy.get('[data-key="memory://docs/readme.txt"]', { timeout: 3000 }).should('exist');
  });
});
