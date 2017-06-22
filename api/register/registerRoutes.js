const register = require('./registerController')
const router = require('express').Router()

router.post('/', register)

module.exports = router
