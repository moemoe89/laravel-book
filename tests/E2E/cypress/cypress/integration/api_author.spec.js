import Constants from '../support/constant'

describe('Author API Test', function() {
  it('create', function() {
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
      expect(response.status).to.eq(statusCode)
      expect(response.body).to.have.property('status', statusCode)
      expect(response.body).to.have.property('success', true)
      expect(response.body).to.have.property('errors', null)
      expect(response.body).have.property('message')
      expect(response.body).have.property('data')
      expect(response.body.data).to.have.property('name', name)
    })
  })

  it('create-name-empty', function() {
    const baseURL = Constants.URL
    const statusCode = 400
    const name = ''

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/author`,
      failOnStatusCode: false,
      body: {
        'name': name
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

  it('create-name-over-255', function() {
    const baseURL = Constants.URL
    const statusCode = 400
    const name = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/author`,
      failOnStatusCode: false,
      body: {
        'name': name
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

  it('list', function() {
    const baseURL = Constants.URL
    const statusCode = 200

    cy.request({
      method: 'GET',
      url: `${baseURL}/api/v1/author`
    }).then(function(response){
      expect(response.status).to.eq(statusCode)
      expect(response.body).to.have.property('status', statusCode)
      expect(response.body).to.have.property('success', true)
      expect(response.body).to.have.property('errors', null)
    })
  })

  it('detail', function() {
    const baseURL = Constants.URL
    const statusCode = 200
    const rand = new Date().getTime()
    const name = `Test Detail ${rand}`
 
    function getAddedID() {
      return cy.request({
        method: 'POST',
        url: `${baseURL}/api/v1/author`,
        body: {
          'name': name
        },
        headers: {
          'content-type': 'application/json'
        }
      }).then(function(response){
        return response
      })
    }

    getAddedID()
    .then(data => {
      const id = data.body.data.id
      cy.request({
        method: 'GET',
        url: `${baseURL}/api/v1/author/${id}`
      }).then(function(response){
        expect(response.status).to.eq(statusCode)
        expect(response.body).to.have.property('status', statusCode)
        expect(response.body).to.have.property('success', true)
        expect(response.body).to.have.property('errors', null)
      })
    });    
  })

  it('detail-id-not-int', function() {
    const baseURL = Constants.URL
    const statusCode = 404

    cy.request({
      method: 'GET',
      url: `${baseURL}/api/v1/author/a`,
      failOnStatusCode: false
    }).then(function(response){
      expect(response.status).to.eq(statusCode)
      expect(response.body).to.have.property('status', statusCode)
      expect(response.body).to.have.property('success', false)
      expect(response.body).to.have.property('errors', null)
    })
  })

  it('detail-not-found', function() {
    const baseURL = Constants.URL
    const statusCode = 404

    cy.request({
      method: 'GET',
      url: `${baseURL}/api/v1/author/1000000`,
      failOnStatusCode: false
    }).then(function(response){
      expect(response.status).to.eq(statusCode)
      expect(response.body).to.have.property('status', statusCode)
      expect(response.body).to.have.property('success', false)
      expect(response.body).to.have.property('errors', null)
    })
  })

  it('delete', function() {
    const baseURL = Constants.URL
    const statusCode = 200
    const rand = new Date().getTime()
    const name = `Test Detail ${rand}`
 
    function getAddedID() {
      return cy.request({
        method: 'POST',
        url: `${baseURL}/api/v1/author`,
        body: {
          'name': name
        },
        headers: {
          'content-type': 'application/json'
        }
      }).then(function(response){
        return response
      })
    }

    getAddedID()
    .then(data => {
      const id = data.body.data.id
      cy.request({
        method: 'DELETE',
        url: `${baseURL}/api/v1/author/${id}`
      }).then(function(response){
        expect(response.status).to.eq(statusCode)
        expect(response.body).to.have.property('status', statusCode)
        expect(response.body).to.have.property('success', true)
        expect(response.body).to.have.property('errors', null)
      })
    });    
  })

  it('delete-id-not-int', function() {
    const baseURL = Constants.URL
    const statusCode = 404

    cy.request({
      method: 'DELETE',
      url: `${baseURL}/api/v1/author/a`,
      failOnStatusCode: false
    }).then(function(response){
      expect(response.status).to.eq(statusCode)
      expect(response.body).to.have.property('status', statusCode)
      expect(response.body).to.have.property('success', false)
      expect(response.body).to.have.property('errors', null)
    })
  })
})