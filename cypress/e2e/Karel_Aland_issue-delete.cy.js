describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
        Cypress.config('defaultCommandTimeout', 150000);
      });
  });

  it('Delete an issue, assert confirmation message and board', () => {
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('div.sc-bxivhb.rljZq').contains('Delete issue').click();
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1')
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .should('have.length', '3')
    cy.get('[data-testid="list-issue"]').should('not.contain', 'This is an issue of type: Task.');

        });
     });

   it('Issue deletion cancellation', () => {
    cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('div.sc-bxivhb.rljZq').contains('Cancel').click();
    cy.get('[data-testid="icon:close"]').first().click();
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1')
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .should('have.length', '4')
    cy.get('[data-testid="list-issue"]').should('contain', 'This is an issue of type: Task.');

        });
   });
     

  });