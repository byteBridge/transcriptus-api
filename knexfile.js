// run this to set the env vars when using knex cli
require('dotenv').config()

const databaseName = 'transcriptus'
const pathToDatabase = `${__dirname}/database`

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DEV_DATABASE_URL,
    migrations: { directory: `${pathToDatabase}/migrations` },
    seeds: { directory: `${pathToDatabase}/seeds` }
  },

  test: {
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
    migrations: { directory: `${pathToDatabase}/migrations` },
    seeds: { directory: `${pathToDatabase}/seeds` }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: { directory: `${pathToDatabase}/migrations` },
    seeds: { directory: `${pathToDatabase}/seeds` }
  }
}
