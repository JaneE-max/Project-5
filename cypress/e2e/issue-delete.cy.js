describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.get('[data-testid="list-issue"]').first().click();
      cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    });
  })

  it('Should delete the issue and no longer display it on the board', () => {
        cy.get('[data-testid="icon:trash"]').click();
        cy.get('[data-testid="modal:confirm"]').within(() => {
          cy.contains('Delete issue').click();
        });
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        cy.get('[data-testid="modal:issue-details"]').should('not.exist');
        cy.reload();
        cy.get('[data-testid="board-list:backlog"]')
        .find('[data-testid="list-issue"]')
        .should('have.length', 3);    
    });

  it('Should cancel the deletion and ensure the issue is still displayed on the board', () => {
        cy.get('[data-testid="icon:trash"]').click();
        cy.get('[data-testid="modal:confirm"]').within(() => {
          cy.contains('Cancel').click();
        });  
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        cy.reload();
        cy.get('[data-testid="board-list:backlog"]')
        .find('[data-testid="list-issue"]')
        .first()
        .should('contain', 'This is an issue of type: Task');
    });  
});