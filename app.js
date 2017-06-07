
'use strict'

const appConfig = require('./config/app')
const routesConfig = require('./config/routes')
const errorConfig = require('./config/error')

const express = require('express')
const app = express()

appConfig.mount(app)
routesConfig.mount(app)
errorConfig.mount(app)

module.exports = app
