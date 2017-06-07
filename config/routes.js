'use strict'

module.exports.mount = app => {
	app.get('/', (req, res) => {
		res.send('success')
	})
}