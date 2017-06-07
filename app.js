
'use strict'

const appConfig = require('./config/app')
const routesConfig = require('./config/routes')

const express = require('express')
const app = express()

appConfig.mount(app)
routesConfig.mount(app)

module.exports = app
