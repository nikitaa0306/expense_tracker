describe('Expense tracker', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('shows the empty state and zeroed summary', () => {
    cy.get('[data-testid="empty-state"]')
      .should('be.visible')
      .and('contain', 'Your expenses will show up here.')
    cy.get('[data-testid="expense-count"]').should('contain', 'Showing 0 expenses')
    cy.get('[data-testid="expense-total"]').should('contain', 'Total: $0.00')
  })

  it('adds an expense and resets the form', () => {
    cy.get('[data-testid="expense-title-input"]').type('  Weekly groceries  ')
    cy.get('[data-testid="expense-amount-input"]').type('42.5')
    cy.get('[data-testid="expense-category-input"]').select('Food')
    cy.get('[data-testid="add-expense-button"]').click()

    cy.get('[data-testid="expense-list"]').within(() => {
      cy.contains('Weekly groceries').should('be.visible')
      cy.contains('Food').should('be.visible')
      cy.contains('$42.50').should('be.visible')
    })
    cy.get('[data-testid="expense-count"]').should('contain', 'Showing 1 expense')
    cy.get('[data-testid="expense-total"]').should('contain', 'Total: $42.50')
    cy.get('[data-testid="expense-title-input"]').should('have.value', '')
    cy.get('[data-testid="expense-amount-input"]').should('have.value', '')
    cy.get('[data-testid="expense-category-input"]').should('have.value', 'Food')
    cy.get('[data-testid="expense-form-error"]').should('be.empty')
  })

  it('shows validation errors for an empty title and a nonpositive amount', () => {
    cy.get('[data-testid="expense-amount-input"]').type('10')
    cy.get('[data-testid="add-expense-button"]').click()
    cy.get('[data-testid="expense-form-error"]')
      .should('be.visible')
      .and('contain', 'Enter a title for this expense.')
    cy.get('[data-testid="expense-count"]').should('contain', 'Showing 0 expenses')

    cy.get('[data-testid="expense-title-input"]').type('Invalid expense')
    cy.get('[data-testid="expense-amount-input"]').clear().type('0')
    cy.get('[data-testid="add-expense-button"]').click()
    cy.get('[data-testid="expense-form-error"]')
      .should('be.visible')
      .and('contain', 'Enter an amount greater than 0.')
    cy.get('[data-testid="expense-count"]').should('contain', 'Showing 0 expenses')
  })

  it('filters expenses by category and can show all expenses again', () => {
    cy.get('[data-testid="expense-title-input"]').type('Lunch')
    cy.get('[data-testid="expense-amount-input"]').type('15')
    cy.get('[data-testid="expense-category-input"]').select('Food')
    cy.get('[data-testid="add-expense-button"]').click()

    cy.get('[data-testid="expense-title-input"]').type('Bus ticket')
    cy.get('[data-testid="expense-amount-input"]').type('3.5')
    cy.get('[data-testid="expense-category-input"]').select('Travel')
    cy.get('[data-testid="add-expense-button"]').click()

    cy.get('[data-testid="category-filter"]').select('Food')
    cy.get('[data-testid="expense-list"]').should('contain', 'Lunch')
    cy.get('[data-testid="expense-list"]').should('not.contain', 'Bus ticket')
    cy.get('[data-testid="expense-count"]').should('contain', 'Showing 1 expense')
    cy.get('[data-testid="expense-total"]').should('contain', 'Total: $15.00')

    cy.get('[data-testid="category-filter"]').select('All')
    cy.get('[data-testid="expense-list"]').should('contain', 'Lunch')
    cy.get('[data-testid="expense-list"]').should('contain', 'Bus ticket')
    cy.get('[data-testid="expense-count"]').should('contain', 'Showing 2 expenses')
    cy.get('[data-testid="expense-total"]').should('contain', 'Total: $18.50')
  })

  it('deletes an expense and updates the summary', () => {
    cy.get('[data-testid="expense-title-input"]').type('Coffee')
    cy.get('[data-testid="expense-amount-input"]').type('4.25')
    cy.get('[data-testid="add-expense-button"]').click()

    cy.contains('[data-testid="expense-item"]', 'Coffee')
      .find('[data-testid="delete-expense-button"]')
      .click()

    cy.get('[data-testid="expense-list"]').should('not.exist')
    cy.get('[data-testid="empty-state"]')
      .should('be.visible')
      .and('contain', 'Your expenses will show up here.')
    cy.get('[data-testid="expense-count"]').should('contain', 'Showing 0 expenses')
    cy.get('[data-testid="expense-total"]').should('contain', 'Total: $0.00')
  })
})