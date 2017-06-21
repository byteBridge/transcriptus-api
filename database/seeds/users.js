const users = [
  {
    username: 'kudakwashe',
    password: 'kp'
  },
  {
    username: 'garikai',
    password: 'gg'
  }
]

exports.seed = (knex, Promise) => knex('users').del()
    .then(() => knex('users').insert(users))
