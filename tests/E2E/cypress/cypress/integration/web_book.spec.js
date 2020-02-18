import Constants from '../support/constant'

describe('Book Web Test', function() {
  it('list', function() {
    const baseURL = Constants.URL
    cy.visit(baseURL+'/book')
    cy.get('h4').should('contain', 'Book List')
  })

  it('create-author', function() {
    const baseURL = Constants.URL
    cy.visit(baseURL+'/')
    cy.wait(1000)
    cy.get('.add-author').click()
    cy.wait(1000)

    const name = 'TestAuthor'

    cy.get('input[name=name]').type(`${name}{enter}`)
    cy.url().should('include', baseURL+'/')
    cy.get('td').should('contain', name)
  })

  it('create', function() {
  	const baseURL = Constants.URL

    cy.visit(baseURL+'/book')
    cy.wait(1000)
    cy.get('.add-book').click()
    cy.wait(1000)

    const rand = new Date().getTime()
    const title = `Test Title ${rand}`

    cy.get('select').select('TestAuthor')
    cy.get('input[name=title]').type(`${title}{enter}`)
    cy.url().should('include', baseURL+'/book')
    cy.get('td').should('contain', name)
  })
  
  it('update', function() {
  	const baseURL = Constants.URL
    cy.visit(baseURL+'/book')
    cy.wait(1000)
    cy.get('table')
	  .find('tbody>tr').first()
	  .find('td').last()
	  .find('.btn-primary').as('editBtn')

	  cy.get('@editBtn').click()
    cy.wait(1000)

    const rand = new Date().getTime()
    const title = `Test Update Title ${rand}`

    cy.get('select').select('TestAuthor')
    cy.get('input[name=title]').clear()
    cy.get('input[name=title]').type(`${title}{enter}`)
    cy.url().should('include', baseURL+'/book')
    cy.get('td').should('contain', name)
  })
  
  it('delete', function() {
  	const baseURL = Constants.URL
    const stub = cy.stub()
    cy.visit(baseURL+'/book')
    cy.wait(1000)
    cy.get('table')
	  .find('tbody>tr').first()
	  .find('td').last()
	  .find('.btn-danger').as('deleteBtn')

	  cy.get('@deleteBtn').click()
    cy.on('window:confirm', stub)
    cy.url().should('include', baseURL+'/book')
  })

  it('delete-author', function() {
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