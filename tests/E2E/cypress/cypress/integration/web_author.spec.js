import Constants from '../support/constant'

describe('Author Web Test', function() {
  it('list', function() {
    const baseURL = Constants.URL
    cy.visit(baseURL+'/')
    cy.get('h4').should('contain', 'Author List')
  })

  it('create', function() {
  	const baseURL = Constants.URL
    cy.visit(baseURL+'/')
    cy.wait(1000)
    cy.get('.add-author').click()
    cy.wait(1000)

    const rand = new Date().getTime()
    const name = `Test Name ${rand}`

    cy.get('input[name=name]').type(`${name}{enter}`)
    cy.url().should('include', baseURL+'/')
    cy.get('td').should('contain', name)
  })
  
  it('update', function() {
  	const baseURL = Constants.URL
    cy.visit(baseURL+'/')
    cy.wait(1000)
    cy.get('table')
	  .find('tbody>tr').first()
	  .find('td').last()
	  .find('.btn-primary').as('editBtn')

	  cy.get('@editBtn').click()
    cy.wait(1000)

    const rand = new Date().getTime()
    const name = `Test Update Name ${rand}`

    cy.get('input[name=name]').clear()
    cy.get('input[name=name]').type(`${name}{enter}`)
    cy.url().should('include', baseURL+'/')
    cy.get('td').should('contain', name)
  })
  
  it('delete', function() {
  	const baseURL = Constants.URL
    cy.visit(baseURL+'/')
    cy.wait(1000)
    cy.get('table')
	  .find('tbody>tr').first()
	  .find('td').last()
	  .find('.btn-danger').as('deleteBtn')

	  cy.get('@deleteBtn').click()
    cy.url().should('include', baseURL+'/')
  })
})