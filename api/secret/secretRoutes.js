
'use strict'

const router = require('express').Router()
const secretController = require('./secretController')
const { authenticate } = require('../../utils/middlewareService')

router.get('/', authenticate, secretController)

module.exports = router
