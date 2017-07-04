'use strict'

const { verifyToken } = require('../utils/authService')
const { buildResponse } = require('../utils/responseService')

/**
 * Handles errors for non existent routes
 */
function handle404 (req, res, next) {
	res.json({message: 'Route not found'})
}

/*
 *	Allow the api to be accessed from any domain
 */
function allowDomains (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	next()
}

/**
 * Authentincate the user. Use when protecting api endpoints
 */
function authenticate (req, res, next) {
	// get the token ( from the query for now)
	const token = req.query.token
	if (!token) return buildResponse(res, 401, { message: 'No token provided.'})

	verifyToken(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) return buildResponse(res, 401, { message: 'Unauthorized' })
		
		next()
	})
}

module.exports = {
	handle404,
	allowDomains,
	authenticate
}