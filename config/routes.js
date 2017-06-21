'use strict'

module.exports.mount = app => {
	const routes = require('../routes')
	const authRoutes = require('../routes/auth')

	app.use('/', routes)
	app.use('/auth', authRoutes)
}
