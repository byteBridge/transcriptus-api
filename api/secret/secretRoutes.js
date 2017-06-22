
'use strict'
const passport = require('../../auth/passport')
const router = require('express').Router()
const secretController = require('./secretController')
router.get('/', passport.authenticate('jwt', { session: false }), secretController)

module.exports = router
