'use strict'

function handle404 (req, res, next) {
	res.json({message: 'Route not found'})
}

/*
	Allow the api to be accessed from any domain
*/
function allowDomains (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	next()
}

module.exports = {
	handle404,
	allowDomains
}