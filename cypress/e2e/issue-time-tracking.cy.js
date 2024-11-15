const estimatedTime = '10' 
const estimatedTimeExpected = 'h estimated'
const updatedTime = '15'
const updatedTimeExpected = 'h estimated'
const spentTime = '10'
const remainingTime = '5'
const spentTimeExpected = 'h'
const remainingTimeExpected = 'h remaining'
const spentTimeUpdated = '6'
const remainingTimeUpdated = '3'

describe("Issue time tracking functionality", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.url()
        .should("eq", `${Cypress.env("baseUrl")}project/board`)
        .then((url) => {
            cy.visit(url + '/board?modal-issue-create=true');
            cy.get('[data-testid="modal:issue-create"]')
                .within(() => {
                    cy.get('[data-testid="select:type"]').click();
                    cy.get('[data-testid="select-option:Bug"]').click();
                    cy.get(".ql-editor").type('Can add and edit time');
                    cy.get('input[name="title"]').type('TEST_TITLE');
                    cy.get('[data-testid="select:userIds"]').click();
                    cy.get('[data-testid="select-option:Baby Yoda"]').click();
                    cy.get('button[type="submit"]').click();
                });
            cy.contains('Issue has been successfully created.').should('be.visible');
            cy.get('[data-testid="board-list:backlog"]').should('be.visible').contains('TEST_TITLE').click();
        });
    });
   
  context('Time Estimation Functionality', () => {  
  it('Should add, edit, and remove time estimation', () => {
    cy.contains('No time logged').should('be.visible');

    cy.get('input[placeholder="Number"]').type(estimatedTime);
    cy.get('input[placeholder="Number"]').should('have.value', estimatedTime);
    cy.contains(`${estimatedTime}${estimatedTimeExpected}`).should('be.visible');  

    cy.get('input[placeholder="Number"]').clear().type(updatedTime)
    cy.get('input[placeholder="Number"]').should('have.value', updatedTime);
    cy.contains(`${updatedTime}${updatedTimeExpected}`).should('be.visible');

    cy.get('input[placeholder="Number"]').clear();
    cy.contains(`${estimatedTime}${estimatedTimeExpected}`).should('not.exist');
    cy.contains(`${updatedTime}${updatedTimeExpected}`).should('not.exist');
    cy.contains('No time logged').should('be.visible');
 });   

  context('Time Logging Functionality', () => {
  it('Should log, update, and remove time entries', () => {
    cy.get('input[placeholder="Number"]').type(estimatedTime);
    cy.get('input[placeholder="Number"]').should('have.value', estimatedTime);
    cy.contains(`${estimatedTime}${estimatedTimeExpected}`).should('be.visible');

    cy.contains('No time logged').should('be.visible');
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]').should('be.visible')
            .within(() => {
                cy.get('input[placeholder="Number"]').eq(0).clear().type(spentTime);
                cy.get('input[placeholder="Number"]').eq(1).clear().type(remainingTime);
                cy.contains('button', 'Done').click();
            });
     
    cy.get('[data-testid="modal:tracking"]').should('not.exist');
    
    cy.contains(`${spentTime}${spentTimeExpected}`).should('be.visible');
    cy.contains(`${remainingTime}${remainingTimeExpected}`).should('be.visible');
    cy.contains(`${estimatedTime}${estimatedTimeExpected}`).should('not.exist');

    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]').should('be.visible')
            .within(() => {
                cy.get('input[placeholder="Number"]').eq(0).clear().type(spentTimeUpdated);
                cy.get('input[placeholder="Number"]').eq(1).clear().type(remainingTimeUpdated);
                cy.contains('button', 'Done').click();
            });

    cy.get('[data-testid="modal:tracking"]').should('not.exist');

        cy.contains(`${spentTimeUpdated}${spentTimeExpected}`).should('be.visible');
        cy.contains(`${remainingTimeUpdated}${remainingTimeExpected}`).should('be.visible');
        cy.contains(`${estimatedTime}${estimatedTimeExpected}`).should('not.exist');

        cy.contains('No time logged').should('not.exist');

        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible')
            .within(() => {
                cy.get('input[placeholder="Number"]').eq(0).clear();
                cy.get('input[placeholder="Number"]').eq(1).clear();
                cy.contains('button', 'Done').click();
            });

        cy.contains('No time logged').should('be.visible');
        cy.contains(`${spentTime}${spentTimeExpected}`).should('not.exist');
        cy.contains(`${remainingTime}${remainingTimeExpected}`).should('not.exist');
        //cy.contains(`${estimatedTime}${estimatedTimeExpected}`).should('be.visible');
           });
      });    
   }); 
});   