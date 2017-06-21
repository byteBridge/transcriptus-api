const bcrypt = require('bcryptjs')
const knex = require('../database')

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

module.exports.comparePasswords = (reqPass, dbPass) => bcrypt.compareSync(reqPass, dbPass)

module.exports.createUser = (req) => new Promise((resolve, reject) => {
  const user = req.body
  user.password = hashedPassword(user.password)
  knex('users').insert(user).returning('*')
    .then(resolve)
    .catch(reject)
})

function hashedPassword (password) {
  return bcrypt.hashSync(password, 10)
}
