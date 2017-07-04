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

          // test for appropriate headers
          should.exist(res.header['cache-control'])
          should.exist(res.header['pragma'])
          res.header['cache-control'].should.eql('no-store')
          res.header['pragma'].should.eql('no-store')
          done()
        })
    })

    it('should fail when a user suplies invalid username', done => {
      const user = {
        username: 'tinashe',
        password: 'paradzayi'
      }

      chai.request(server)
        .post(loginUrl)     
        .send(user)
        .end((err, res) => {
          should.exist(err)
          res.redirects.length.should.eql(0)
          res.status.should.eql(401)
          res.type.should.eql('application/json')
          res.body.should.contain.keys('message')
          res.body.message.should.eql('invalid login details')

          // test for appropriate headers
          should.exist(res.header['cache-control'])
          should.exist(res.header['pragma'])
          res.header['cache-control'].should.eql('no-store')
          res.header['pragma'].should.eql('no-store')
          done()
        })
    })

    it('should fail when a user suplies an invalid password', done => {
      const user = {
        username: 'kudakwashe',
        password: 'wrong_pass'
      }

      chai.request(server)
        .post(loginUrl)     
        .send(user)
        .end((err, res) => {
          should.exist(err)
          res.redirects.length.should.eql(0)
          res.status.should.eql(401)
          res.type.should.eql('application/json')
          res.body.should.contain.keys('message')
          res.body.message.should.eql('invalid login details')

          // test for appropriate headers
          should.exist(res.header['cache-control'])
          should.exist(res.header['pragma'])
          res.header['cache-control'].should.eql('no-store')
          res.header['pragma'].should.eql('no-store')
          done()
        })
    })

    it('should fail when a user suplies an invalid username and password', done => {
      const user = {
        username: 'wrong_user',
        password: 'wrong_pass'
      }

      chai.request(server)
        .post(loginUrl)     
        .send(user)
        .end((err, res) => {
          should.exist(err)
          res.redirects.length.should.eql(0)
          res.status.should.eql(401)
          res.type.should.eql('application/json')
          res.body.should.contain.keys('message')
          res.body.message.should.eql('invalid login details')

          // test for appropriate headers
          should.exist(res.header['cache-control'])
          should.exist(res.header['pragma'])
          res.header['cache-control'].should.eql('no-store')
          res.header['pragma'].should.eql('no-store')
          done()
        })
    })

    it('should fail when a user suplies an empty username', done => {
      const user = {
        username: '',
        password: 'paradzayi'
      }

      chai.request(server)
        .post(loginUrl)     
        .send(user)
        .end((err, res) => {
          should.exist(err)
          res.redirects.length.should.eql(0)
          res.status.should.eql(400)
          res.type.should.eql('application/json')
          res.body.should.contain.keys('message', 'error')
          res.body.message.should.eql('bad request')
          res.body.error.should.eql("\"username\" is not allowed to be empty")

          // test for appropriate headers
          should.exist(res.header['cache-control'])
          should.exist(res.header['pragma'])
          res.header['cache-control'].should.eql('no-store')
          res.header['pragma'].should.eql('no-store')
          done()
        })
    })

    it('should fail when a user suplies an empty password', done => {
      const user = {
        username: 'kudakwashe',
        password: ''
      }

      chai.request(server)
        .post(loginUrl)     
        .send(user)
        .end((err, res) => {
          should.exist(err)
          res.redirects.length.should.eql(0)
          res.status.should.eql(400)
          res.type.should.eql('application/json')
          res.body.should.contain.keys('message', 'error')
          res.body.message.should.eql('bad request')
          res.body.error.should.eql("\"password\" is not allowed to be empty")

          // test for appropriate headers
          should.exist(res.header['cache-control'])
          should.exist(res.header['pragma'])
          res.header['cache-control'].should.eql('no-store')
          res.header['pragma'].should.eql('no-store')
          done()
        })
    })

    it('should fail when no username param is provided', done => {
      const user = {
        password: 'paradzayi'
      }

      chai.request(server)
        .post(loginUrl)     
        .send(user)
        .end((err, res) => {
          should.exist(err)
          res.redirects.length.should.eql(0)
          res.status.should.eql(400)
          res.type.should.eql('application/json')
          res.body.should.contain.keys('message', 'error')
          res.body.message.should.eql('bad request')
          res.body.error.should.eql("\"username\" is required")

          // test for appropriate headers
          should.exist(res.header['cache-control'])
          should.exist(res.header['pragma'])
          res.header['cache-control'].should.eql('no-store')
          res.header['pragma'].should.eql('no-store')
          done()
        })
    })

     it('should fail when no password param is provided', done => {
      const user = {
        username: 'kudakwashe'
      }

      chai.request(server)
        .post(loginUrl)     
        .send(user)
        .end((err, res) => {
          should.exist(err)
          res.redirects.length.should.eql(0)
          res.status.should.eql(400)
          res.type.should.eql('application/json')
          res.body.should.contain.keys('message', 'error')
          res.body.message.should.eql('bad request')
          res.body.error.should.eql("\"password\" is required")

          // test for appropriate headers
          should.exist(res.header['cache-control'])
          should.exist(res.header['pragma'])
          res.header['cache-control'].should.eql('no-store')
          res.header['pragma'].should.eql('no-store')
          done()
        })
    })
  })
})