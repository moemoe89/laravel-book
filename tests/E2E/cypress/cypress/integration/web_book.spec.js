import Constants from '../support/constant'

describe('Book Web Test', function() {
  it('create', function() {
  	const baseURL = Constants.URL

    cy.visit(baseURL+'/book')
    cy.get('.add-book').click()  

    const rand = new Date().getTime()
    const title = `Test Title ${rand}`

    cy.get('select').select('TestAuthor')
    cy.get('input[id=title]').type(`${title}{enter}`)

    cy.url().should('include', baseURL+'/book')
    cy.get('td').should('contain', name)
  })
  
  it('update', function() {
  	const baseURL = Constants.URL
    cy.visit(baseURL+'/book')
    cy.get('table')
	  .find('tbody>tr').first()
	  .find('td').last()
	  .find('.btn-primary').as('editBtn')

	cy.get('@editBtn').click()    

    const rand = new Date().getTime()
    const title = `Test Update Title ${rand}`

    cy.get('select').select('TestAuthor')
    cy.get('input[id=title]').clear()  
    cy.get('input[id=title]').type(`${title}{enter}`)

    cy.url().should('include', baseURL+'/book')
    cy.get('td').should('contain', name)
  })
  
  it('delete', function() {
  	const baseURL = Constants.URL
    cy.visit(baseURL+'/book')
    cy.get('table')
	  .find('tbody>tr').first()
	  .find('td').last()
	  .find('.btn-danger').as('deleteBtn')

	  cy.get('@deleteBtn').click()  

    cy.url().should('include', baseURL+'/book')
  })
})