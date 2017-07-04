'use strict'

module.exports.mount = (app, express) => {
 	// Before anything, congigure the process enmvironment
	require('./init').setEnvironment()

	const { allowDomains } = require('../utils/middlewareService')
	const bodyParser = require('body-parser')
	const logger = require('morgan')
	const helmet = require('helmet')

	app.set('port', process.env.PORT)

	/* APP MIDDLEWARE */
	app.use(allowDomains)
	if (process.env.NODE_ENV === 'development') { app.use(logger('dev')) }

	// some protection via setting appropriate headers
	app.use(helmet())
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(bodyParser.json())
}
