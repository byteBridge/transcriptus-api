'use strict'

/*
	Read the .env file and set process.env
	variable with the keys and values in the file
*/
module.exports.setEnvironment = () => {
	require('dotenv').config()
}