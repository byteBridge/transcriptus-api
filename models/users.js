const bcrypt = require('bcryptjs')
const knex = require('../database')
const jwt = require('jsonwebtoken')

module.exports.findOne = (username) => new Promise((resolve, reject) => {
  knex('users').select().where({username})

    // success
    .then(user => {
      if (user) { resolve(user[0]) }
      else { resolve(null) }
    })

    // error
    .catch(err => reject(err))
})

function comparePasswords (reqPass, dbPass) {
  return bcrypt.compareSync(reqPass, dbPass) 
}

module.exports.createUser = (user) => new Promise((resolve, reject) => {
  user.password = hashedPassword(user.password)
  knex('users').insert(user).returning('*')
    .then(resolve)
    .catch(reject)
})

function hashedPassword (password) {
  return bcrypt.hashSync(password, 10)
}

function generateToken (payload) {
  return jwt.sign(payload, process.env.JWT_SECRET)
}

module.exports.getAllUsers = () => new Promise((resolve, reject) => {
  knex('users').select()
    .then(resolve)
    .catch(reject)
})

module.exports.login = (username, password) => new Promise((resolve, reject) => {
  knex('users').select().where({ username })
    .then(user => {
      if (user.length) {
        if (comparePasswords(password, user[0].password) === true) {
          return resolve(generateToken({ username: user[0].username }))
        } else {
          //invalid password
          reject({ status: 401 })
        }
      }
      // user not found
      reject({ status: 401 })
    })

    .catch(err => {
      reject()
    })
})

module.exports.comparePasswords = comparePasswords