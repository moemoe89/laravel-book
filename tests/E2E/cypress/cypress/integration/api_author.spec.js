import Constants from '../support/constant'

describe('Author API Test', function() {
  let authorID

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
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(true)
      expect(response.body.message).to.equal('Author created successfully')
      expect(response.body.errors).to.equal(null)
      expect(response.body.data.name).to.equal(name)
      authorID = response.body.data.id
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
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('There\'s something wrong with your request')
      expect(response.body.errors.name[0]).to.equal('The name field is required.')
      expect(response.body.data).to.equal(null)
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
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('There\'s something wrong with your request')
      expect(response.body.errors.name[0]).to.equal('The name may not be greater than 255 characters.')
      expect(response.body.data).to.equal(null)
    })
  })

  it('list', function() {
    const baseURL = Constants.URL
    const statusCode = 200

    cy.request({
      method: 'GET',
      url: `${baseURL}/api/v1/author`
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(true)
      expect(response.body.message).to.equal('Author retrieved successfully')
      expect(response.body.errors).to.equal(null)
    })
  })

  it('detail', function() {
    const baseURL = Constants.URL
    const statusCode = 200
    const id = authorID
 
    cy.request({
      method: 'GET',
      url: `${baseURL}/api/v1/author/${id}`
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(true)
      expect(response.body.message).to.equal('Author retrieved successfully')
      expect(response.body.errors).to.equal(null)
      expect(response.body.data.id).to.equal(id)
    })

  })

  it('detail-id-not-int', function() {
    const baseURL = Constants.URL
    const statusCode = 404

    cy.request({
      method: 'GET',
      url: `${baseURL}/api/v1/author/a`,
      failOnStatusCode: false
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('Author not found')
      expect(response.body.errors).to.equal(null)
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
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('Author not found')
      expect(response.body.errors).to.equal(null)
    })
  })

  it('update', function() {
    const baseURL = Constants.URL
    const statusCode = 200
    const rand = new Date().getTime()
    const name = `Test Name ${rand}`
    const id = authorID

    cy.request({
      method: 'PUT',
      url: `${baseURL}/api/v1/author/${id}`,
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
      expect(response.body.errors).to.equal(null)
      expect(response.body.message).to.equal('Author updated successfully')
      expect(response.body.data.name).to.equal(name)
    })
  })

  it('update-name-empty', function() {
    const baseURL = Constants.URL
    const statusCode = 400
    const name = ''

    cy.request({
      method: 'PUT',
      url: `${baseURL}/api/v1/author/1`,
      failOnStatusCode: false,
      body: {
        'name': name
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('There\'s something wrong with your request')
      expect(response.body.errors.name[0]).to.equal('The name field is required.')
      expect(response.body.data).to.equal(null)
    })
  })

  it('update-name-over-255', function() {
    const baseURL = Constants.URL
    const statusCode = 400
    const name = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

    cy.request({
      method: 'PUT',
      url: `${baseURL}/api/v1/author/1`,
      failOnStatusCode: false,
      body: {
        'name': name
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('There\'s something wrong with your request')
      expect(response.body.errors.name[0]).to.equal('The name may not be greater than 255 characters.')
      expect(response.body.data).to.equal(null)
    })
  })

  it('update-not-found', function() {
    const baseURL = Constants.URL
    const statusCode = 404
    const name = 'Update name author'

    cy.request({
      method: 'PUT',
      url: `${baseURL}/api/v1/author/99999`,
      failOnStatusCode: false,
      body: {
        'name': name
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('Author not found')
      expect(response.body.errors).to.equal(null)
      expect(response.body.data).to.equal(null)
    })
  })

  it('update-not-integer', function() {
    const baseURL = Constants.URL
    const statusCode = 404
    const name = 'Update name author'

    cy.request({
      method: 'PUT',
      url: `${baseURL}/api/v1/author/a`,
      failOnStatusCode: false,
      body: {
        'name': name
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('Author not found')
      expect(response.body.errors).to.equal(null)
      expect(response.body.data).to.equal(null)
    })
  })

  it('delete', function() {
    const baseURL = Constants.URL
    const statusCode = 200
    const id = authorID
 
    cy.request({
      method: 'DELETE',
      url: `${baseURL}/api/v1/author/${id}`
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(true)
      expect(response.body.errors).to.equal(null)
    })  
  })

  it('delete-id-not-int', function() {
    const baseURL = Constants.URL
    const statusCode = 404

    cy.request({
      method: 'DELETE',
      url: `${baseURL}/api/v1/author/a`,
      failOnStatusCode: false
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('Author not found')
      expect(response.body.errors).to.equal(null)
      expect(response.body.data).to.equal(null)
    })
  })
})