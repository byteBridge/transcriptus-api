const login = require('./loginController')
const router = require('express').Router()

router.post('/', login)

module.exports = router
