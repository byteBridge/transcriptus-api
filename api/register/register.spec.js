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
  const registerUrl = '/auth/register'

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
  
  describe('POST /register', () => {
    it('should register a user', done => {
      chai.request(server)
        .post(registerUrl)
        .send({
          username: 'tinaye',
          password: 'makonese'
        })
        .end((err, res) => {
          should.not.exist(err)
          res.redirects.length.should.eql(0)
          res.status.should.eql(200)
          res.type.should.eql('application/json')
          res.body.should.contain.keys('message', 'user')
          res.body.message.should.eql('successfully created user.')
          done()
        })
    })

    it('should fail if the user already exists', done => {
      chai.request(server)
        .post(registerUrl)
        .send({
          username: 'kudakwashe',
          password: 'paradzayi'
        })
        .end((err, res) => {
          should.exist(err)
          res.redirects.length.should.eql(0)
          res.status.should.eql(422)
          res.type.should.eql('application/json')
          res.body.message.should.eql('user already exists')
          done()
        })
    })

    it('should fail if the username is not provided', done => {
      chai.request(server)
        .post(registerUrl)
        .send({
          username: '',
          password: 'paradzayi'
        })
        .end((err, res) => {
          should.exist(err)
          res.redirects.length.should.eql(0)
          res.status.should.eql(400)
          res.type.should.eql('application/json')
          res.body.message.should.eql(`"username" is not allowed to be empty`)
          done()
        })
    })

    it('should fail if the password is not provided', done => {
      chai.request(server)
        .post(registerUrl)
        .send({
          username: 'kudakwashe',
          password: ''
        })
        .end((err, res) => {
          should.exist(err)
          res.redirects.length.should.eql(0)
          res.type.should.eql('application/json')
          res.status.should.eql(400)
          res.body.message.should.eql(`"password" is not allowed to be empty`)
          done()
        })
    })
  })
})