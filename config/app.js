'use strict'

module.exports.mount = (app, express) => {
 	// Before anything, congigure the process enmvironment
	require('./init').setEnvironment()

	const bodyParser = require('body-parser')
	const logger = require('morgan')

	app.set('port', process.env.PORT)

	/* APP MIDDLEWARE */
	if (process.env.NODE_ENV === 'test') { app.use(logger('dev')) }

	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(bodyParser.json())
}
