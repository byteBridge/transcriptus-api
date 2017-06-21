'use strict'

module.exports.mount = app => {
	const routes = require('../routes')
	const {
		loginRoutes,
		registerRoutes,
		secretRoutes
	} = require('../api/indexRoutes')

	app.use('/secret', secretRoutes)
	app.use('/auth/login', loginRoutes)
	app.use('/auth/register', registerRoutes)
}
