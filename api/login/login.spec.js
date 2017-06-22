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
  const loginUrl = '/auth/login'

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
  
  describe('POST /login', () => {
    it('should login a user with success', done => {
      const user = {
        username: 'kudakwashe',
        password: 'paradzayi'
      }

      chai.request(server)
        .post(loginUrl)     
        .send(user)
        .end((err, res) => {
          should.not.exist(err)
          res.redirects.length.should.eql(0)
          res.status.should.eql(200)
          res.type.should.eql('application/json')
          res.body.should.contain.keys('token', 'message')
          res.body.token.should.be.a('string')
          res.body.message.should.eql('success')
          done()
        })
    })

    xit('should fail when a user suplies invalid username', done => {
      done()
    })
  })
})