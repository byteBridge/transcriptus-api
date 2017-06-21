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

module.exports.comparePasswords = (dbPass, reqPass) => dbPass === reqPass
