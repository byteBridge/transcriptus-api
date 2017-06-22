'use strict'

module.exports.mount = app => {
	const routes = require('../routes')

	app.use('/', routes)
}