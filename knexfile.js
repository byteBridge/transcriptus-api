
const databaseName = 'transcriptus'
const pathToDatabase = `${__dirname}/database`

module.exports = {
  development: {
    client: 'pg',
    connection: "postgres://kudakwashe:admin@localhost:5432/transcriptus",
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
