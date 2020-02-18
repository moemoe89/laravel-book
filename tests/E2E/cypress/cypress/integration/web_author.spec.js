import Constants from '../support/constant'

describe('Author Web Test', function() {
  it('list', function() {
    const baseURL = Constants.URL

    cy.visit(baseURL+'/')
    cy.get('h4').should('contain', 'Author List')
  })

  it('create-name-over-255', function() {
    const baseURL = Constants.URL
    const name = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

    cy.visit(baseURL+'/')
    cy.wait(1000)
    cy.get('.add-author').click()
    cy.wait(1000)

    cy.get('input[name=name]').type(`${name}{enter}`)
    cy.get('form').should('contain', 'The name may not be greater than 255 characters.')
  })

  it('create-name-empty', function() {
    const baseURL = Constants.URL
    const name = ''

    cy.visit(baseURL+'/')
    cy.wait(1000)
    cy.get('.add-author').click()
    cy.wait(1000)

    cy.get('input[name=name]').type(`${name}{enter}`)
    cy.get('form').should('contain', 'The name field is required.')
  })

  it('create', function() {
  	const baseURL = Constants.URL
    const rand = new Date().getTime()
    const name = `Test Name ${rand}`

    cy.visit(baseURL+'/')
    cy.wait(1000)
    cy.get('.add-author').click()
    cy.wait(1000)

    cy.get('input[name=name]').type(`${name}{enter}`)
    cy.url().should('include', baseURL+'/')
    cy.get('td').should('contain', name)
  })

  it('search', function() {
    const baseURL = Constants.URL
    const name = 'Test'

    cy.visit(baseURL+'/')

    cy.get('input[name=search]').clear()
    cy.get('input[name=search]').type('xxxx')

    cy.get('input[name=search]').clear()
    cy.get('input[name=search]').type(name)

    cy.get('td').should('contain', name)
  })

  it('export-csv', function() {
    const baseURL = Constants.URL

    cy.visit(baseURL+'/')
    cy.wait(1000)
    cy.get('.export-csv').click()
    cy.wait(1000)
  })

  it('export-xml', function() {
    const baseURL = Constants.URL

    cy.visit(baseURL+'/')
    cy.wait(1000)
    cy.get('.export-xml').click()
    cy.wait(1000)
  })
  
  it('update', function() {
  	const baseURL = Constants.URL
    const rand = new Date().getTime()
    const name = `Test Update Name ${rand}`

    cy.visit(baseURL+'/')
    cy.wait(1000)
    cy.get('table')
	  .find('tbody>tr').first()
	  .find('td').last()
	  .find('.btn-primary').as('editBtn')

	  cy.get('@editBtn').click()
    cy.wait(1000)

    cy.get('input[name=name]').clear()
    cy.get('input[name=name]').type(`${name}{enter}`)
    cy.url().should('include', baseURL+'/')
    cy.get('td').should('contain', name)
  })
  
  it('delete', function() {
  	const baseURL = Constants.URL
    const stub = cy.stub()

    cy.visit(baseURL+'/')
    cy.wait(1000)
    cy.get('table')
	  .find('tbody>tr').first()
	  .find('td').last()
	  .find('.btn-danger').as('deleteBtn')

	  cy.get('@deleteBtn').click()
    cy.on('window:confirm', stub)
    cy.url().should('include', baseURL+'/')
  })
})