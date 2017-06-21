const login = require('../../auth/login')
const router = require('express').Router()

router.post('/', (req, res, next) => {
    login(req, res)
})

module.exports = router
