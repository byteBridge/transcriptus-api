const register = require('../../auth/register')
const router = require('express').Router()

router.post('/', register)

module.exports = router