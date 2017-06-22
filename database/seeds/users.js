const bcrypt = require('bcryptjs')

const users = [
  {
    username: 'kudakwashe',
    password: hashedPassword('paradzayi')
  },
  {
    username: 'garikai',
    password: hashedPassword('rodneygg')
  }
]

function hashedPassword (password) {
  return bcrypt.hashSync(password, 10)
}

exports.seed = (knex, Promise) => knex('users').del()
    .then(() => knex('users').insert(users))
