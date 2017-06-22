
'use strict'

const router = require('express').Router()

router.get('/', (req, res) => {
	res.json({message: 'success'})
})

module.exports = router