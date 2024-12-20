describe('Issue comments creating, editing, and deleting', () => {
    beforeEach(() => {
        // Navigate to the project board and open the issue details modal
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    it('Should add, edit, and delete a comment successfully', () => {
        const comment = 'TEST_COMMENT';
        const updatedComment = 'TEST_COMMENT_EDITED';

        // Step 1: Add a comment
        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...').click();
            cy.get('textarea[placeholder="Add a comment..."]').type(comment);
            cy.contains('button', 'Save').click().should('not.exist');
            
            // Assertion: Verify the comment has been added
            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]').should('contain', comment);
        });

        // Step 2: Edit the added comment
        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]')
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');
            cy.get('textarea[placeholder="Add a comment..."]')
                .clear()
                .type(updatedComment);
            cy.contains('button', 'Save').click().should('not.exist');
            
            // Assertion: Verify the comment has been updated
            cy.get('[data-testid="issue-comment"]')
                .should('contain', 'Edit')
                .and('contain', updatedComment);
        });

        // Step 3: Delete the updated comment
        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .contains('Delete')
            .click();
        
        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');

        // Assertion: Verify the comment has been deleted
        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]').contains(updatedComment)
            .should('not.exist');
    });
});