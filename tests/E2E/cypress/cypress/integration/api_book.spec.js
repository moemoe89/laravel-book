import Constants from '../support/constant'

describe('Book API Test', function() {
  let authorID

  it('create-author', function() {
    const baseURL = Constants.URL
    const statusCode = 201
    const rand = new Date().getTime()
    const name = `Test Name ${rand}`

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/author`,
      body: {
        'name': name
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(true)
      expect(response.body.message).to.equal('Author created successfully')
      expect(response.body.errors).to.equal(null)
      expect(response.body.data.name).to.equal(name)
      authorID = response.body.data.id
    })
  })

  it('create', function() {
    const baseURL = Constants.URL
    const statusCode = 201
    const rand = new Date().getTime()
    const name = `Test Name ${rand}`
    const title = `Test Title ${rand}`
    const autID = authorID

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/book`,
      body: {
        'author_id': autID,
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(true)
      expect(response.body.message).to.equal('Book created successfully')
      expect(response.body.errors).to.equal(null)
      expect(response.body.data.title).to.equal(title)
    })
  })

  it('create-author-empty', function() {
    const baseURL = Constants.URL
    const statusCode = 400
    const title = 'Kariage-Kun'

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/book`,
      failOnStatusCode: false,
      body: {
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('There\'s something wrong with your request')
      expect(response.body.errors.author_id[0]).to.equal('The author id field is required.')
      expect(response.body.data).to.equal(null)
    })
  })

  it('create-author-not-integer', function() {
    const baseURL = Constants.URL
    const statusCode = 400
    const autID = 'a'
    const title = 'Kariage-Kun'

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/book`,
      failOnStatusCode: false,
      body: {
        'author_id': autID,
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('There\'s something wrong with your request')
      expect(response.body.errors.author_id[0]).to.equal('The author id must be an integer.')
      expect(response.body.data).to.equal(null)
    })
  })

  it('create-author-not-found', function() {
    const baseURL = Constants.URL
    const statusCode = 400
    const autID = 99999
    const title = 'Kariage-Kun'

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/book`,
      failOnStatusCode: false,
      body: {
        'author_id': autID,
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('There\'s something wrong with your request')
      expect(response.body.errors.author_id[0]).to.equal('The selected author id is invalid.')
      expect(response.body.data).to.equal(null)
    })
  })

  it('create-title-empty', function() {
    const baseURL = Constants.URL
    const statusCode = 400
    const autID = authorID
    const title = ''

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/book`,
      failOnStatusCode: false,
      body: {
        'author_id': autID,
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('There\'s something wrong with your request')
      expect(response.body.errors.title[0]).to.equal('The title field is required.')
      expect(response.body.data).to.equal(null)
    })
  })

  it('create-title-over-255', function() {
    const baseURL = Constants.URL
    const statusCode = 400
    const autID = authorID
    const title = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/book`,
      failOnStatusCode: false,
      body: {
        'author_id': autID,
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('There\'s something wrong with your request')
      expect(response.body.errors.title[0]).to.equal('The title may not be greater than 255 characters.')
      expect(response.body.data).to.equal(null)
    })
  })
})