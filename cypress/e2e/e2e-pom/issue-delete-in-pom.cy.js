/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //open issue detail modal with title from line 16  
    cy.contains(issueTitle).click();
    IssueModal.getIssueDetailModal();
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.';

 it('Should delete issue successfully', () => {
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    IssueModal.getIssueDetailModal().should('not.exist');
  });

  it('Should cancel deletion process successfully', () => {
    IssueModal.clickDeleteButton();
    cy.contains("Cancel").click();  
    IssueModal.getIssueDetailModal().should('be.visible'); 
    IssueModal.closeDetailModal()
  });
});