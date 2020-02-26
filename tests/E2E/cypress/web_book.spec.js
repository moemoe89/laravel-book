import Constants from '../support/constant'

describe('Book Web Test', function() {
  let authorName

  it('list', function() {
    const baseURL = Constants.URL

    cy.visit(baseURL+'/book')
    cy.get('h4').should('contain', 'Book List')
  })

  it('create-author', function() {
    const baseURL = Constants.URL
    const rand = new Date().getTime()
    const name = `Test Author ${rand}`

    cy.visit(baseURL+'/')
    cy.wait(1000)
    cy.get('.add-author').click()
    cy.wait(1000)

    cy.get('input[name=name]').type(`${name}{enter}`)
    cy.url().should('include', baseURL+'/')
    cy.get('td').should('contain', name)
    authorName = name
  })

  it('create-author-id-empty', function() {
    const baseURL = Constants.URL
    const author_id = ''
    const title = 'Test Title'

    cy.visit(baseURL+'/book')
    cy.wait(1000)
    cy.get('.add-book').click()
    cy.wait(1000)

    cy.get('input[name=title]').type(`${title}{enter}`)
    cy.get('form').should('contain', 'The author id field is required.')
  })

  it('create-title-over-255', function() {
    const baseURL = Constants.URL
    const title = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

    cy.visit(baseURL+'/book')
    cy.wait(1000)
    cy.get('.add-book').click()
    cy.wait(1000)

    cy.get('select').select(authorName)
    cy.get('input[name=title]').type(`${title}{enter}`)
    cy.get('form').should('contain', 'The title may not be greater than 255 characters.')
  })

  it('create-title-empty', function() {
    const baseURL = Constants.URL
    const title = ''

    cy.visit(baseURL+'/book')
    cy.wait(1000)
    cy.get('.add-book').click()
    cy.wait(1000)

    cy.get('select').select(authorName)
    cy.get('input[name=title]').type(`${title}{enter}`)
    cy.get('form').should('contain', 'The title field is required.')
  })

  it('create', function() {
  	const baseURL = Constants.URL
    const rand = new Date().getTime()
    const title = `Test Title ${rand}`

    cy.visit(baseURL+'/book')
    cy.wait(1000)
    cy.get('.add-book').click()
    cy.wait(1000)
  
    cy.get('select').select(authorName)
    cy.get('input[name=title]').type(`${title}{enter}`)
    cy.url().should('include', baseURL+'/book')
    cy.get('td').should('contain', title)
  })

  it('search', function() {
    const baseURL = Constants.URL
    const title = 'Test'

    cy.visit(baseURL+'/')

    cy.get('input[name=search]').clear()
    cy.get('input[name=search]').type('xxxx')

    cy.get('input[name=search]').clear()
    cy.get('input[name=search]').type(title)

    cy.get('td').should('contain', title)
  })

  it('export-csv', function() {
    const baseURL = Constants.URL

    cy.visit(baseURL+'/book')
    cy.wait(1000)
    cy.get('.export-csv').click()
    cy.get('.export-csv-title').click()
    cy.wait(5000)
    cy.get('.export-csv').click()
    cy.get('.export-csv-title-author').click()
    cy.wait(1000)
  })

  it('export-xml', function() {
    const baseURL = Constants.URL

    cy.visit(baseURL+'/book')
    cy.wait(1000)
    cy.get('.export-xml').click()
    cy.get('.export-xml-title').click()
    cy.wait(5000)
    cy.get('.export-xml').click()
    cy.get('.export-xml-title-author').click()
    cy.wait(1000)
  })
  
  it('update', function() {
  	const baseURL = Constants.URL
    const rand = new Date().getTime()
    const title = `Test Update Title ${rand}`

    cy.visit(baseURL+'/book')
    cy.wait(1000)
    cy.get('table')
	  .find('tbody>tr').first()
	  .find('td').last()
	  .find('.btn-primary').as('editBtn')

	  cy.get('@editBtn').click()
    cy.wait(1000)

    cy.get('select').select(authorName)
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