'use strict'

module.exports.mount = (app, express) => {
 	// Before anything, congigure the process enmvironment
	require('./init').setEnvironment()

	const middleware = require('./middleware')
	const bodyParser = require('body-parser')
	const logger = require('morgan')
	const passport = require('../auth/passport')

	app.set('port', process.env.PORT)

	/* APP MIDDLEWARE */
	app.use(middleware.allowDomains)
	if (process.env.NODE_ENV === 'development') { app.use(logger('dev')) }

	app.use(passport.initialize())
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(bodyParser.json())
}
