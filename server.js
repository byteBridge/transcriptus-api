'use strict'

const app = require('./app')

// start the server
app.listen(app.get('port'), () => {
  console.log(`app running on port ${app.get('port')}`)
})