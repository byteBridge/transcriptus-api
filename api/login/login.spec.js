require('../../config/init').setEnvironment()
process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const knex = require('../../database')
const { startServer } = require('../../test')

describe('login', () => {
  let server

  before(done => {
    startServer(runningServer => { 
      server = runningServer
      done()
    })
  })

  after(done => {
    server.close(done)
  })

  beforeEach(() => knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run())
  )

  afterEach(() => knex.migrate.rollback())
  
})