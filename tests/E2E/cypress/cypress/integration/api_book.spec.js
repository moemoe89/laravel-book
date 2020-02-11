import Constants from '../support/constant'

describe('Book API Test', function() {
  let authorID;

  it('create', function() {
    const baseURL = Constants.URL
    const statusCode = 201
    const rand = new Date().getTime()
    const name = `Test Name ${rand}`
    const title = `Test Title ${rand}`

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
      authorID = response.body.data.id
    })

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/book`,
      body: {
        'author_id': authorID,
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.eq(statusCode)
      expect(response.body).to.have.property('status', statusCode)
      expect(response.body).to.have.property('success', true)
      expect(response.body).to.have.property('errors', null)
      expect(response.body).have.property('message')
      expect(response.body).have.property('data')
      expect(response.body.data).to.have.property('title', title)
    })
  })

  it('create-title-empty', function() {
    const baseURL = Constants.URL
    const statusCode = 400
    const title = ''

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/book`,
      failOnStatusCode: false,
      body: {
        'author_id': authorID,
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.eq(statusCode)
      expect(response.body).to.have.property('status', statusCode)
      expect(response.body).to.have.property('success', false)
    })
  })

  it('create-title-over-255', function() {
    const baseURL = Constants.URL
    const statusCode = 400
    const title = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/book`,
      failOnStatusCode: false,
      body: {
        'author_id': authorID,
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.eq(statusCode)
      expect(response.body).to.have.property('status', statusCode)
      expect(response.body).to.have.property('success', false)
    })
  })
})