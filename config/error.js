'use strict'

module.exports.mount = app => {
	const middleware = require('./middleware')
	
	app.use(middleware.handle404)
}