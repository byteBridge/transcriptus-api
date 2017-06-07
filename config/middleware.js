'use strict'

module.exports.handle404  = (req, res, next) => {
	res.json({message: 'Route not found'})
}