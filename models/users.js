const { hashedPassword, comparePasswords, generateToken } = require('../utils/authService')
const knex = require('../database')
const moment = require('moment')

function findOne (username) {
  return new Promise((resolve, reject) => {
    knex('users').select().where({username})

      // success
      .then(user => {
        if (user) { resolve(user[0]) }
        else { resolve(null) }
      })

      // error
      .catch(err => reject(err))
  })
}



function createUser (user) {
  return new Promise((resolve, reject) => {
    user.password = hashedPassword(user.password)
    knex('users').insert(user).returning('*')
      .then(resolve)
      .catch(reject)
  })
}


function getAllUsers () {
  return new Promise((resolve, reject) => {
    knex('users').select()
      .then(resolve)
      .catch(reject)
  })
}

function login (username, password) {
  return new Promise((resolve, reject) => {
    knex('users').select().where({ username })
      .then(user => {
        if (user.length) {
          if (comparePasswords(password, user[0].password) === true) {
            return resolve(generateToken({
              username: user[0].username,
              exp: moment().add(7, 'd').unix()
            }))
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
}

module.exports = {
  findOne,
  createUser,
  login,
  getAllUsers
}
module.exports.comparePasswords = comparePasswords