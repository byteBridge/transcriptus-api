
'use strict'
const passport = require('../../utils/passportService')
const router = require('express').Router()
const secretController = require('./secretController')
const { authenticate } = require('../../config/middleware')

router.get('/', authenticate, secretController)

module.exports = router
