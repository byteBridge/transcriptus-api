'use strict'

module.exports.mount = app => {
	const { handle404 } = require('../utils/middlewareService')
	
	app.use(handle404)
}